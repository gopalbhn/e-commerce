import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.js";
import { paymentHndler, verifyEsewaPayment } from "../controllers/paymentController.js";

const router = Router();

router.post('/initiate', paymentHndler)
router.post('/verify', verifyEsewaPayment)

export default router