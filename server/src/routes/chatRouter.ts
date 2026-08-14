import { Router } from "express"
import { chatHistory, chatResponse } from "../controllers/chatController.js"
import { messageLimiter } from "../middlewares/rateLimiter.js"
const router = Router();

router.post("/", messageLimiter, chatResponse);
router.get('/history', chatHistory)
export default router;
