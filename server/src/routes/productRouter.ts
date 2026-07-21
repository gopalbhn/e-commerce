import { Router } from 'express';
import { addProduct, deleteProduct, getAllProducts, getFilteredProduct, getLowStockedProduct, getProductById, getMyProducts, updateProduct } from '../controllers/productController.js';
import { authenticateUser, requireRole } from '../middlewares/auth.js';
import upload from '../middlewares/multerConfig.js';
const router = Router();

router.get('/', getAllProducts);
router.get("/filter", getFilteredProduct)
router.get("/low-stock", authenticateUser, requireRole("Seller"), getLowStockedProduct)
router.get("/my-products", authenticateUser, requireRole("Seller"), getMyProducts)
router.get('/:id', getProductById);
router.post('/', authenticateUser, requireRole("Seller"), upload.fields([{ name: "thumbnails", maxCount: 1 }, { name: "images", maxCount: 3 }]), addProduct);
router.put('/:id', authenticateUser, requireRole("Seller"), upload.fields([{ name: "thumbnails", maxCount: 1 }, { name: "images", maxCount: 3 }]), updateProduct);
router.delete('/:id', authenticateUser, requireRole("Seller"), deleteProduct);


export default router;
