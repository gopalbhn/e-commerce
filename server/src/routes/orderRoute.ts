import { Router } from "express";
import { authenticateUser, requireRole } from "../middlewares/auth.js";
import { createOrder, getMyOrder, getOrder, getPendingOrders, updateOrderStatus } from "../controllers/orderController.js";

const router = Router();

router.get('/', authenticateUser, getMyOrder)
router.post('/', authenticateUser, createOrder)
router.get('/pending', authenticateUser, requireRole("Seller"), getPendingOrders)
router.get('/:id', authenticateUser, getOrder)
router.put("/update/:id", authenticateUser, requireRole("Seller"), updateOrderStatus)

export default router
