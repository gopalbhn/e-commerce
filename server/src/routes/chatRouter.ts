import { Router } from "express"
import { chatHistory, chatResponse } from "../controllers/chatController.js"
import { messageLimiter } from "../middlewares/rateLimiter.js"
import { chatMiddleware } from "../middlewares/auth.js"
const router = Router();

router.post("/", chatMiddleware, messageLimiter, chatResponse);
router.get('/history', chatMiddleware, chatHistory)
export default router;
