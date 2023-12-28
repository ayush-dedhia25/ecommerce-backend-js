import { Router } from "express";

import { login, refreshToken } from "#controllers/auth.controller";
import { createUser } from "#controllers/user.controller";
import { validateRequestInput } from "#middlewares/index";
import { loginSchema } from "#schemas/auth.schema";
import { createUserSchema } from "#schemas/user.schema";

/**
 * Auth Router.
 *
 * @type {Router}
 */
const router = Router();

router.route("/login").post(validateRequestInput(loginSchema), login);
router.route("/refresh").post(refreshToken);
router.route("/register").post(validateRequestInput(createUserSchema), createUser);

export default router;
