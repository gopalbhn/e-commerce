import { model, Schema, Types } from "mongoose";

const paymentSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending"
    },
    gateway: {
        type: String,
        enum: ["ESEWA", "KHALTI", "CARD"],
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true
    }
}, { timestamps: true })

const Payment = model("Payment", paymentSchema)

export default Payment