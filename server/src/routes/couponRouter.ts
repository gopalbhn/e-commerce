import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.js";
import { createCoupon, deleteCoupon, getAllCoupons, updateCoupon, useCoupon } from "../controllers/couponController.js";




const router = Router();

router.get('/', authenticateUser, getAllCoupons);
router.get('/:code', authenticateUser, useCoupon)
router.post('/', authenticateUser, createCoupon)
router.put('/:id', authenticateUser, updateCoupon)
router.delete('/:id', authenticateUser, deleteCoupon)


export default router