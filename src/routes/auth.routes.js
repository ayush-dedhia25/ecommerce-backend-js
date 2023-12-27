import { Router } from "express";

import { login, refreshToken } from "#controllers/auth.controller";
import { createUser } from "#controllers/user.controller";
import validateRequestData from "#middlewares/validateRequest.middleware";
import { loginSchema } from "#schemas/auth.schema";
import { createUserSchema } from "#schemas/user.schema";

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
