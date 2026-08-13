
import { Schema, model } from "mongoose";

const chatMessageSchema = new Schema({
    role: {
        type: String,
        enum: ["user", "assistant", "error"],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});



const chatSessionSchema = new Schema({
    sessionId: {
        type: String,
        required: true
    },
    messages: {
        type: [chatMessageSchema],
        default: [],
    },

    expiresAt: {
        type: Date,
        required: true
    }
})

chatSessionSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
)

export const ChatSession = model("ChatSession", chatSessionSchema);