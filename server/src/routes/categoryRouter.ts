import { Router } from "express";

import { addCategory, getAllCategories, getBrandsByCategory, getSubCategories } from "../controllers/categoryController.js";


const router = Router();

router.get("/", getAllCategories);
router.post("/", addCategory);
router.get("/subcategory/:categoryId", getSubCategories);
router.get("/brands/:categoryId", getBrandsByCategory);
export default router;