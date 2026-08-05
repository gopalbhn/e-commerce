import { Router } from 'express';

const router = Router();
import { postReview, getReviewsByProduct } from '../controllers/reviewController.js';
import { authenticateUser } from '../middlewares/auth.js';


router.post('/',authenticateUser, postReview);
router.get('/reviews/:productId', getReviewsByProduct);


export default router;
