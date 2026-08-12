import { Request, Response } from "express"
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

        const matchingRule = rules.find(r =>
            r.keywords.some(keyword => msg.includes(keyword))
        );

        if (matchingRule) {
            res.json({ answer: matchingRule.response });
        } else {
            res.json({ answer: "I'm not sure how to answer that. Please contact our support team." });
        }
    } catch (error) {
        console.error("Error in chatResponse:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}