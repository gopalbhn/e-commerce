import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.js";
import { createCheckoutSession, getCheckoutSession } from "../controllers/checkoutController.js";


const router = Router();

router.post("/create", authenticateUser, createCheckoutSession);
router.get("/", authenticateUser, getCheckoutSession);

export default router;