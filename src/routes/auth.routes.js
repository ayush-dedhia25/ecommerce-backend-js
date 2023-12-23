import { Router } from "express";

import { login, refreshToken } from "../controllers/auth.controller.js";
import { createUser } from "../controllers/user.controller.js";
import validateRequestData from "../middlewares/validateRequestData.middleware.js";
import { loginSchema } from "../validators/auth.validator.js";
import { createUserSchema } from "../validators/user.validator.js";

const router = Router();

router.route("/login").post(validateRequestData(loginSchema), login);
router.route("/refresh").post(refreshToken);
router
	.route("/register")
	.post(validateRequestData(createUserSchema), createUser);

export default router;
