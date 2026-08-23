import { Router } from "express";
import { createCheckoutSession, getCheckoutSession } from "../controllers/checkoutController.js";
import { authenticateUser } from "../middlewares/auth.js";


const router = Router();

router.post("/create-checkout-session", authenticateUser, createCheckoutSession);
router.get("/", authenticateUser, getCheckoutSession);

export default router;