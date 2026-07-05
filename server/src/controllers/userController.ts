import { Request, Response } from "express";
import { LoginSchema, RegisterSchema } from "../schemas/userSchema.js";
import User from "../models/userModel.js";
import { success } from "zod";
import sendMail from "../utils/nodemailer.js";
import jwt from "jsonwebtoken"
import { generateAccessToken, generateRefreshToken } from "../middlewares/auth.js";
import RefreshToken from "../models/RefreshTokenModel.js";
import { google } from 'googleapis'

const registerUser = async (req: Request, res: Response) => {
    const data = RegisterSchema.safeParse(req.body);
    if (!data.success) {
        return res.status(400).json({ message: data.error.issues[0].message });
    }

    const { name, email, password, phoneNumber } = data.data;

    const ExistingUser = await User.findOne({ email, isDeleted: false })
    if (ExistingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
        name,
        email,
        password,
        phoneNumber
    })
    await newUser.save();

    const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "1h" })

    await sendMail(
        email,
        "WelCome to Ecommerce app",
        `<h1>Verify Your Email</h1> <a href ="${process.env.FRONTEND_URI}/verify/${token}">Click here to verify your email</a>`
    )

    return res.status(201).json({
        success: true,
        message: "please Check your email for verification link"
    });



}

const loginUser = async (req: Request, res: Response) => {
    const data = LoginSchema.safeParse(req.body);
    if (!data.success) {
        return res.status(400).json({
            success: false,
            message: data.error.issues[0].message
        });
    }

    const { email, password } = data.data;

    const user = await User.findOne({ email, isDeleted: false })

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        });
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials"
        });
    }

    if (!user.isVerified) {
        return res.status(400).json({
            success: false,
            message: "Please verify your email first"
        });
    }

    const accessToken = generateAccessToken({ email, role: user.role, id: user._id.toString() })
    const refreshToken = generateRefreshToken({ email, role: user.role, id: user._id.toString() })

    const refreshtoken = new RefreshToken({
        token: refreshToken,
        user: user._id
    })
    await refreshtoken.save()

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })




    return res.status(200).json({
        success: true,
        message: "User logged in successfully",
    });
}

const logOutUser = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const token = req.cookies.refreshToken

    const deleteRefreshToken = await RefreshToken.findOneAndDelete({
        user: userId,
        token
    })

    if (!deleteRefreshToken) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials"
        });
    }

    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")

    return res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
}

const loginWithGoogle = async (req: Request, res: Response) => {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.REDIRECT_URI
    );
    const state = crypto.randomUUID()
    console.log(state)
    res.cookie("oauth_state", state, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 5 * 60 * 1000,
    })

    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ];
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        state
    })


    res.redirect(url);
}

const googleCallback = async (req: Request, res: Response) => {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.REDIRECT_URI
    );
    const { code, state } = req.query;
    const storedState = req.cookies.oauth_state;
    if (state !== storedState) {
        return res.status(400).json({
            success: false,
            message: "Invalid Oauth State",
        })
    }

    res.clearCookie("oauth_state");
    const tokens = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens.tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    console.log("UserInfo", userInfo.data)

    if (!userInfo.data.verified_email) {
        return res.status(403).json({
            success: false,
            message: "Google email is not verified",
        });
    }
    const user = await User.findOne({ email: userInfo.data.email });
    if (user) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        const refreshtoken = new RefreshToken({
            token: refreshToken,
            user: user._id
        })
        await refreshtoken.save()

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 60 * 1000
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.redirect(`${process.env.FRONTEND_URI}?login=success`)
        return;
    }

    const newUser = new User({
        name: userInfo.data.name,
        email: userInfo.data.email,
        isVerified: true,
    })
    await newUser.save();

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect(process.env.FRONTEND_URI!)
}

export { registerUser, loginUser, logOutUser, loginWithGoogle, googleCallback };