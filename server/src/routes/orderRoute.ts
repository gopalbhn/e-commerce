import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.js";
import { createOrder, getMyOrder, getOrder } from "../controllers/orderController.js";

const router = Router();

router.get('/', authenticateUser, getMyOrder)
router.post('/', authenticateUser, createOrder)
router.get('/:id', authenticateUser, getOrder)


export default router
