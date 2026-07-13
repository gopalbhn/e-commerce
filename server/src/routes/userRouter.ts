import { Router } from "express";
import { getInfo, googleCallback, loginUser, loginWithGoogle, logOutUser, refreshToken, registerUser, verifyMagicLink } from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/verify/:token", verifyMagicLink)
router.get('/google-login', loginWithGoogle);
router.get('/google-callback', googleCallback);
router.post('/logout', authenticateUser, logOutUser);
router.get('/me', authenticateUser, getInfo)
router.get('/refresh-token', refreshToken);

export default router;