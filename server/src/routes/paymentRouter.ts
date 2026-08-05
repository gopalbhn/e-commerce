import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.js";
import { paymentHandlerKhalti, paymentHandlerEsewa, verifyEsewaPayment, verifyKhaltiPayment } from "../controllers/paymentController.js";

const router = Router();

router.post('/initiate-esewa', paymentHandlerEsewa)
router.post('/verify-esewa', verifyEsewaPayment)
router.post('/initiate-khalti', paymentHandlerKhalti)
router.post('/verify-khalti', verifyKhaltiPayment)
export default router