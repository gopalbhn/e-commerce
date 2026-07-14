import { Router } from 'express';
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js';
import { authenticateUser, requireRole } from '../middlewares/auth.js';
import upload from '../middlewares/multerConfig.js';
const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authenticateUser, requireRole("Seller"), upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "images", maxCount: 3 }]), addProduct);
router.put('/:id', authenticateUser, requireRole("Seller"), updateProduct);
router.delete('/:id', authenticateUser, requireRole("Seller"), deleteProduct);

export default router;
