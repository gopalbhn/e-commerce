import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.js";
import { paymentHndler } from "../controllers/paymentController.js";

const router = Router();

router.post('/initiate', paymentHndler)


export default router