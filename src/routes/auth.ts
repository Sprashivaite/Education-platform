import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateRegistration } from "../validations/authValidator.js";

const router = Router();

router.post("/register", validateRegistration, registerUser);
router.post("/login", loginUser);

export default router;
