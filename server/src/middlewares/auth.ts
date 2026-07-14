import { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken";
import { TokenPayload } from '../types/userType.js';
const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: err.message
                })
            }
            req.user = user
            next()

        })

    } catch (error) {

    }
}

const generateRefreshToken = (user: TokenPayload) => {
    const payload = {
        email: user.email,
        role: user.role,

    }
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
    return token;
}

const generateAccessToken = (user: TokenPayload) => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,

    }
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "15m" })
    return token;
}

const requireRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden'
            })
        }
        next();
    }
}

export { authenticateUser, generateAccessToken, generateRefreshToken, requireRole }