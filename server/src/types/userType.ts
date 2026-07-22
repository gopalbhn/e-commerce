import { z } from "zod";
import { RegisterSchema, LoginSchema } from "../schemas/userSchema.js";
import { Schema } from "mongoose";

export type RegisterType = z.infer<typeof RegisterSchema>
export type LoginType = z.infer<typeof LoginSchema>

export interface IUser {
    name: string;
    email: string;
    password?: string;
    phoneNumber: string;
    isVerified: boolean;
    role: "Consumer" | "Seller" | "Admin";
    isDeleted: boolean;
    comparePassword(password: string): Promise<boolean>;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TokenPayload {
    id: string;
    email: string;
    role: string;
}


export interface IRefreshToken {
    token: string;
    user: Schema.Types.ObjectId;
    isValid: boolean;
}
