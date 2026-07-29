import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    couponApplied: {
        type: Boolean,
        default: false
    },
    coupon: {
        type: [Schema.Types.ObjectId],
        ref: "Coupon"
    }
}, { timestamps: true })

export const Cart = model("Cart", cartSchema);
