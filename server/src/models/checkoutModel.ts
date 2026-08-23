import { model, Schema } from "mongoose"

const checkoutSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        }
    },
})

const Checkout = model("Checkout", checkoutSchema)
export default Checkout;
