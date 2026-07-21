import { Schema, model } from "mongoose";
import { IProduct } from "../types/productType.js";
const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    thumbnails: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand",
        required: false
    },
    oldPrice: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });



const Product = model<IProduct>("Product", productSchema)
export default Product