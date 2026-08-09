import { Router } from "express";
import { createFlashSale, updateFalshSale, deleteFlashSale, getAllSale } from "../controllers/flashSaleController.js";
import { authenticateUser, requireRole } from "../middlewares/auth.js";

const router = Router();

router.get("/", authenticateUser, requireRole("Admin"), getAllSale)
router.post('/create', authenticateUser, requireRole("Admin"), createFlashSale)
router.put('/update/:id', authenticateUser, requireRole("Admin"), updateFalshSale)
router.delete('/delete/:id', authenticateUser, requireRole("Admin"), deleteFlashSale)

export default router