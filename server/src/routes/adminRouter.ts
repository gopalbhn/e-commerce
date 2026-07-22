import { Router } from "express"
import { requireRole } from "../middlewares/auth.js"
import { getDashboardStats } from "../controllers/adminController.js"
const router = Router();

router.get('/dashboard-stats', getDashboardStats)

export default router;