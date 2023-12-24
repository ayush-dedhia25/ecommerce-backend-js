import { Router } from "express";

import { login, refreshToken } from "#controllers/auth.controller";
import { createUser } from "#controllers/user.controller";
import validateRequestData from "#middlewares/validateRequestData.middleware";
import { loginSchema } from "#validators/auth.validator";
import { createUserSchema } from "#validators/user.validator";

/**
 * Express Router - for the auth routes.
 *
 * @type {Router}
 */
const router = Router();

router.route("/login").post(validateRequestData(loginSchema), login);
router.route("/refresh").post(refreshToken);
router.route("/register").post(validateRequestData(createUserSchema), createUser);

export default router;
