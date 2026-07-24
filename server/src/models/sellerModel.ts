import { Schema, model } from "mongoose"

const sellerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    approved: {
        type: Boolean,
        default: false,
    },
    shopName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    storeType: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Seller = model("Seller", sellerSchema)
export default Seller