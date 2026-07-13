import { Router } from "express";

import { authenticateUser } from "../middlewares/auth.js";
import { addToCart, getAllCartItem, removeFromCart, updateCart } from "../controllers/cartController.js";

const router = Router();

router.get("/cart", authenticateUser, getAllCartItem)
router.post("/add-to-cart", authenticateUser, addToCart)
router.delete("/remove-from-cart", authenticateUser, removeFromCart)
router.put("/update-cart", authenticateUser, updateCart)

export default router