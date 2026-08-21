import mongoose, { Schema } from "mongoose";


const buyNowModel = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    couponId: {
        type: Schema.Types.ObjectId,
        ref: "Coupon",
    },
    couponApplied: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    expiresAt: {
        type: Date,
        default: Date.now() + 15 * 60 * 1000,
        expires: 0
    },
},
    { timestamps: true })


const BuyNow = mongoose.model("BuyNow", buyNowModel)

export default BuyNow
