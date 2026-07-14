import { Router } from "express";
import validate from "../../middleware/validate.js";
import { authenticate } from "../../middleware/auth.js";
import { registerSchema, loginSchema, passwordResetSchema } from "../../validations/user.validation.js";
import { users, register, login, logout, forgetPassword, refreshAccessToken, singleUser } from "../../controllers/user.controller.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/logout",authenticate,logout);
router.post("/forgetpassword",authenticate,validate(passwordResetSchema),forgetPassword);
router.post("/refresh", refreshAccessToken);
router.route("/users")
    .get(authenticate, users);

router.route("/user/:id")
    .get(authenticate,singleUser);

export default router;