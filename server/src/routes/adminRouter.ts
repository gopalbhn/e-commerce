import { Router } from "express"
import { requireRole } from "../middlewares/auth.js"
import { deleteProduct, AllOrder, getDashboardStats, mostSoldProduct, recentProduct, AllUsers, deleteUser } from "../controllers/adminController.js"
const router = Router();

router.get('/dashboard-stats', getDashboardStats)
router.get('/most', mostSoldProduct)
router.get("/recent-products", recentProduct)
router.get("/all-users", AllUsers)
router.delete("/delete-product/:id", deleteProduct)
router.delete('/delete-user/:id', deleteUser)
router.get("/order", AllOrder)
export default router;