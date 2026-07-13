import { Schema, model } from "mongoose"
import { IUser } from "../types/userType.js"
import bcrypt from "bcrypt"

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["Consumer", "Seller", "Admin"],
        default: "Consumer"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })



userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password! = await bcrypt.hash(this.password!, 10)
    return
})

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password!)
}

const User = model<IUser>("User", userSchema)



export default User