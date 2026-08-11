import { Router } from "express";
import { createFlashSale, updateFalshSale, deleteFlashSale, getAllSale, AddProduct, getRunningFlashSale, getRequestedProducts, acceptRequestedProduct, rejectRequestedProduct, getAllMyFlashSaleProduct, removeMyItem, getFlashSaleProduct } from "../controllers/flashSaleController.js";
import { authenticateUser, requireRole } from "../middlewares/auth.js";

const router = Router();

router.get("/", authenticateUser, requireRole("Admin"), getAllSale)
router.get('/products', getFlashSaleProduct)
router.get("/running", authenticateUser, requireRole("Seller"), getRunningFlashSale)
router.get('/seller-sale', authenticateUser, requireRole("Seller"), getAllMyFlashSaleProduct)
router.get('/requested-product', authenticateUser, requireRole("Admin"), getRequestedProducts)
router.post('/accept/:id', authenticateUser, requireRole("Admin"), acceptRequestedProduct)
router.post('/reject/:id', authenticateUser, requireRole("Admin"), rejectRequestedProduct)
router.post('/create', authenticateUser, requireRole("Admin"), createFlashSale)
router.post('/add-product/:id', authenticateUser, requireRole("Seller"), AddProduct)
router.put('/update/:id', authenticateUser, requireRole("Admin"), updateFalshSale)
router.delete('/delete/:id', authenticateUser, requireRole("Admin"), deleteFlashSale)
router.delete('/delete-my-item/:id', authenticateUser, requireRole("Seller"), removeMyItem)


export default router