
import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.js";
import {
    addToWishList,
    removeFromWishList,
    getAllWishListItem
} from "../controllers/wishListController.js";

const router = Router();

router.post("/add", authenticateUser, addToWishList);
router.post("/remove", authenticateUser, removeFromWishList);
router.get("/get", authenticateUser, getAllWishListItem);


export default router;
