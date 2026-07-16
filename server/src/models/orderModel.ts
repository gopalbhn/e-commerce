import { Schema, model } from "mongoose"

const orderSchema = new Schema({
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    shippingAddress: {
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    }
})

const Order = model("Order", orderSchema)

export default Order;