import { Router } from "express";
import validate from "../../middleware/validate.js";
import { authenticate } from "../../middleware/auth.js";
import { registerSchema, loginSchema } from "../../validations/user.validation.js";
import { users, register, login, refreshAccessToken, singleUser } from "../../controllers/user.controller.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refreshToken", refreshAccessToken);
router.route("/users")
    .get(authenticate, users);

router.route("/user/:id")
    .get(authenticate,singleUser);

export default router;