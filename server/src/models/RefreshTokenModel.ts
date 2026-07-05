import { Schema, model } from 'mongoose'
import { IRefreshToken } from '../types/userType.js'
const refreshTokenSchema = new Schema<IRefreshToken>({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isValid: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const RefreshToken = model<IRefreshToken>("RefreshToken", refreshTokenSchema)

export default RefreshToken