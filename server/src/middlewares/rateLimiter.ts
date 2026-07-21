import rateLimit from "express-rate-limit";

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

export { loginLimiter, appLimiter, addToCartLimiter };