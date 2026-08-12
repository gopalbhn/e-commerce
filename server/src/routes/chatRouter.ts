import { Router } from "express"
import { chatResponse } from "../controllers/chatController.js"
const router = Router();

router.post("/", chatResponse);
export default router;
