import { Router } from 'express';
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js';
import { authenticateUser, requireRole } from '../middlewares/auth.js';
import upload from '../middlewares/multerConfig.js';
const router = Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products', authenticateUser, requireRole("Seller"), upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "images", maxCount: 3 }]), addProduct);
router.put('/products/:id', authenticateUser, requireRole("Seller"), updateProduct);
router.delete('/products/:id', authenticateUser, requireRole("Seller"), deleteProduct);

export default router;
