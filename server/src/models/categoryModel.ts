import { model, Schema } from "mongoose";
import { ICategory } from "../types/productType.js";


const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },

}, {
    timestamps: true
})

console.log("Category model registered");
const Category = model<ICategory>("Category", categorySchema);

export default Category