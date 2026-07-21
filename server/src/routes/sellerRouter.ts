import { Router } from "express"
import { authenticateUser, requireRole } from "../middlewares/auth.js";
import { getProductStats, getSellerDashboardStats } from "../controllers/sellerController.js";

const router = Router();

router.get('/dashboard-stats', authenticateUser, requireRole("Seller"), getSellerDashboardStats)
router.get('/product-stats', authenticateUser, requireRole("Seller"), getProductStats)

export default router