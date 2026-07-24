import { Router } from "express";
import { getInfo, googleCallback, loginUser, loginWithGoogle, logOutUser, refreshToken, registerSeller, registerUser, verifyMagicLink } from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/auth.js";
import { loginLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

router.post('/register', loginLimiter, registerUser);
router.post('/login', loginLimiter, loginUser);
router.get("/verify/:token", verifyMagicLink)
router.get('/google-login', loginWithGoogle);
router.get('/google-callback', googleCallback);
router.post('/logout', authenticateUser, logOutUser);
router.get('/me', authenticateUser, getInfo)
router.get('/refresh-token', refreshToken);
router.post('/register-seller', loginLimiter, registerSeller)
export default router;