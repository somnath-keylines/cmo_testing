import { Router } from "express";
import { loginUser, logoutUser, registerUser, viewProfile } from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/Auth.middlewares.js";
const router = Router();


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
// ✅ Logout route
router.route("/logout").post(authenticateToken, logoutUser);
router.route("/user-profile").get(authenticateToken,viewProfile)

export default router