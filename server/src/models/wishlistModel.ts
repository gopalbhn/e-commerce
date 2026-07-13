import { Schema, model } from "mongoose"

const wishListSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: {
        type: [Schema.Types.ObjectId],
        ref: "Product",
        required: true
    }
})


const WishList = model("WishList", wishListSchema);

export default WishList

