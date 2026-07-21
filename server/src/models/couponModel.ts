import { Schema, model } from "mongoose"

const couponSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    discountRate: {
        type: Number,
        required: true
    },
    maxUses: {
        type: Number,
        required: true
    },
    usedCount: {
        type: Number,
        default: 0
    },
    expiryDate: {
        type: Date,
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "Seller",
        required: true
    }
})

const Coupon = model('Coupon', couponSchema)
export default Coupon