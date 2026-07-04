import { Router } from "express";
import { googleCallback, loginUser, loginWithGoogle, logOutUser, registerUser } from "../controllers/userController.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/google-login', loginWithGoogle);
router.get('/google-callback', googleCallback);
router.post('/logout', logOutUser);

export default router;