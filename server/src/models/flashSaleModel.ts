
import { Schema, model } from "mongoose"

const flashSaleSchema = new Schema({
    discountPercentage: {
        type: Number,
        required: true
    },
    saleTitle: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    products: {
        type: [Schema.Types.ObjectId],
        ref: "Product",
        default: []
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const FlashSale = model("FlashSale", flashSaleSchema)
export default FlashSale