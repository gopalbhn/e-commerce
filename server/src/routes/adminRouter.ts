import { Router } from "express"
import { requireRole } from "../middlewares/auth.js"
import { deleteProduct, AllOrder, getDashboardStats, mostSoldProduct, recentProduct, AllUsers, deleteUser, pendingSellerApproval, approveSeller, rejectSeller } from "../controllers/adminController.js"
const router = Router();

router.get('/dashboard-stats', getDashboardStats)
router.get('/most', mostSoldProduct)
router.get("/recent-products", recentProduct)
router.get("/all-users", AllUsers)
router.delete("/delete-product/:id", deleteProduct)
router.delete('/delete-user/:id', deleteUser)
router.get("/order", AllOrder)
router.get("/seller-requests", pendingSellerApproval)
router.put("/seller-approve/:id", approveSeller)
router.put('/seller-reject/:id', rejectSeller)
export default router;