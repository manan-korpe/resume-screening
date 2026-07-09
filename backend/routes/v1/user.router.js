import {Router} from "express";
import { register } from "../../controllers/user.controller.js";
import validate from "../../middleware/validate.js";
import registerSchema from "../../validations/user.validation.js";

const router = Router();

router.get("/",validate(registerSchema), register);

export default router;