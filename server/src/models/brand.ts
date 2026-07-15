import { model, Schema } from "mongoose";
import { IBrand } from "../types/productType.js";

const brandSchema = new Schema<IBrand>({
    name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    }
}, {
    timestamps: true
})

const Brand = model<IBrand>("Brand", brandSchema);

export default Brand