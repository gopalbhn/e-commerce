import { Router } from "express";
import { createBuyNow, getBuyNow } from "../controllers/buynowController.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = Router();

router.post("/create", authenticateUser, createBuyNow);
router.get("/", authenticateUser, getBuyNow);

export default router;