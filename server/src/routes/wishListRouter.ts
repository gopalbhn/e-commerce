
import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.js";
import {
    addToWishList,
    removeFromWishList,
    getAllWishListItem,
    checkWishListed,
    clearAllWishList,
    addAllToCart
} from "../controllers/wishListController.js";

const router = Router();

router.post("/add/:id", authenticateUser, addToWishList);
router.delete("/remove/:id", authenticateUser, removeFromWishList);
router.get("/get", authenticateUser, getAllWishListItem);
router.get("/addAlltoCart", authenticateUser, addAllToCart);
router.get('/check/:id', authenticateUser, checkWishListed);
router.delete('/clear', authenticateUser, clearAllWishList);

export default router;
