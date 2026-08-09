import { Schema, model } from "mongoose"

const flashSaleProductSchema = new Schema({
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
    maxQuantity: {
        type: Number,
        required: true
    }
})

const FlashSaleProduct = model("FlashSaleProduct", flashSaleProductSchema)
export default FlashSaleProduct