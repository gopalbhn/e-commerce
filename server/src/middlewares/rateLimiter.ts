import rateLimit from "express-rate-limit";
import { Request } from "express"

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many Requests, try again later"
})

const appLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: "Too many Requests, try again later"
})

const addToCartLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: "Too many Requests, try again later"
})

const messageLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    keyGenerator: (req: Request) => {
        return req.cookies.sessionId
    },
    message: "You can send 5 messages in 5 minutes"
})
export { loginLimiter, appLimiter, addToCartLimiter, messageLimiter };