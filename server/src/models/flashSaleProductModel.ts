import { Schema, model } from "mongoose"

const flashSaleProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    flashSaleId: {
        type: Schema.Types.ObjectId,
        ref: "FlashSale"
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    status: {
        type: String,
        enum: ["Accepted", "Rejected", "Pending"],
        default: "Pending"
    },
    stock: {
        type: Number,
        required: true
    }
})

const FlashSaleProduct = model("FlashSaleProduct", flashSaleProductSchema)
export default FlashSaleProduct