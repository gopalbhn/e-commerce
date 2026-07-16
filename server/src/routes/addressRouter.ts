import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.js";
import { addShipingAddress, getMyAddress, updateMyAddress } from "../controllers/addressController.js";

const router = Router();

router.get('/', authenticateUser, getMyAddress)
router.post('/', authenticateUser, addShipingAddress)
router.put('/update', authenticateUser, updateMyAddress)

export default router
