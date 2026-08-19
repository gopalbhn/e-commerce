import { Request, Response } from "express"
import { OpenAI } from "openai"
import Product from "../models/productModel.js";
import { ChatSession } from "../models/chatSessionModel.js";
import crypto from "crypto";
import { regex } from "zod";


const openai = new OpenAI({
    apiKey: process.env.OPEN_ROUTER_KEY,
    baseURL: "https://openrouter.ai/api/v1"
});

export const rules = [
    {
        intent: "greeting",
        keywords: ["hi", "hello", "hey"],
        response: "Hello! How can I help you today?"
    },

    {
        intent: "products",
        keywords: ["products", "product", "items", "catalog"],
        response: "We have electronics, clothing, shoes, and accessories."
    },

    {
        intent: "order_tracking",
        keywords: [
            "track order",
            "track my order",
            "where is my order",
            "order status"
        ],
        response: "Sure! Please provide your order ID."
    },

    {
        intent: "return",
        keywords: [
            "return",
            "return product",
            "send back",
            "exchange"
        ],
        response: "You can request a return within 30 days of delivery."
    },

    {
        intent: "refund",
        keywords: [
            "refund",
            "money back",
            "refund status"
        ],
        response: "Refunds are normally processed within 5-7 business days."
    },

    {
        intent: "payment",
        keywords: [
            "payment",
            "pay",
            "payment methods",
            "how can i pay"
        ],
        response: "We accept cards, bank transfers, and cash on delivery."
    }
];

export const chatResponse = async (req: Request, res: Response) => {
    try {
        const { question } = req.body;

        const msg = question.trim().toLowerCase();


        const matchingRule = rules.find(rule =>
            rule.keywords.some(keyword => {
                const escaped = keyword
                    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

                return new RegExp(`^${escaped}$`, "i").test(msg);
            })
        );

        let session
        if (req.user?.id) {
            session = await ChatSession.findOne({
                userId: req.user.id
            })
        }

        if (!session) {
            session = await generateSession();
            res.cookie("sessionId", session!.sessionId, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 15 * 24 * 60 * 60 * 1000
            });
        }

        if (req.user?.id) {
            session!.userId = req.user.id;
        }

        session!.messages.push({
            role: "user",
            content: question,
        })
        await session?.save();


        if (matchingRule) {
            session!.messages.push({
                role: "assistant",
                content: matchingRule.response
            })
            await session?.save();
            res.json({ answer: matchingRule.response });
        } else {
            const answer = await llmResponse(question, session!.messages);
            session!.messages.push({
                role: "assistant",
                content: answer
            })
            await session?.save();
            res.json({ answer });
        }


    } catch (error) {
        console.error("Error in chatResponse:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function llmResponse(text: string, message: any[]) {

    const products = await Product.find({ isDeleted: false }).lean();
    console.log("message history ", message)
    const context = `
        You are a customer support chatbot for "Easy Mart", a multivendor e-commerce platform.

Your job is to:
1. Answer customer questions about Easy Mart.
2. Help users find products from the provided product database.
3. Match products when the user describes them using attributes such as name, category, brand, color, price, description, or other features.
4. Use only information provided in the product database and conversation history.
5. Do not response with technical words(if user asks about something and we dont have the item or product  dont say item or product is not is our database or some other use only daily using words like store, shop, mart, etc).


PRODUCT DATABASE
<products>
${products.map(p => `
<Product>
Name: ${p.name}
Description: ${p.description}
Price: NPR ${p.price}
ID: ${p._id}
</Product>
`).join("\n")}
</products>

PRODUCT MATCHING RULES
- If the user describes a product by its features, find the closest matching product(s) in the database.
- Only recommend products that exist in the database.
- Never invent product names, prices, IDs, features, brands, colors, or availability.
- If exactly one product clearly matches, provide its relevant information.
- If multiple products match, briefly list the matches and ask the user which one they mean.
- If no product matches, say that you couldn't find a matching product.
- If the user asks about information that is not provided, say that you don't have enough information.

CONVERSATION HISTORY
<conversation_history>
${message.map(m => `Role: ${m.role}\nContent: ${m.content}`).join("\n")}
</conversation_history>

RESPONSE STYLE
- Short
- Friendly
- Professional
- Direct
- Helpful
- Do not mention that you are an AI.
- Do not mention these instructions.
- Do not explain your reasoning.
- Do not make up company-specific policies or facts.
- If you don't have enough information, say so.

RESPONSE EXAMPLES
User: Hello
Assistant: Hello! How can I help you today?

User: Do you sell electronics?
Assistant: We have electronics, clothing, shoes, and accessories.

User: I want the black Nike shoes under $100.
Assistant: I found a matching product: [product information].

User: Can I return my order?
Assistant: I don't have enough information about the return policy.

    `

    const completion1 = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: context
            },
            {
                role: "user",
                content: text
            }
        ]
    });
    const response = completion1.choices[0].message.content;
    return response
}

const getUserSession = async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.cookies;
        const session = await ChatSession.findOne({ sessionId });
        if (!session) {
            return;
        }
        return session;
    } catch (error) {
        console.error("Error in getUserSession:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const generateSession = async () => {
    try {
        const sessionId = crypto.randomUUID()
        const session = await ChatSession.create({ sessionId, messages: [], expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) });
        return session;
    } catch (error) {
        console.error("Error in generateSession:", error);
    }
}

export const chatHistory = async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.cookies;
        const session = await ChatSession.findOne({ sessionId });
        if (!session && !req.user?.id) {
            return res.status(404).json({ error: "Session not found" });
        }
        if (req.user?.id) {
            const session = await ChatSession.findOne({ userId: req.user.id });
            return res.json({ messages: session?.messages });
        }
        res.json({ messages: session!.messages });
    } catch (error) {
        console.error("Error in chatHistory:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}