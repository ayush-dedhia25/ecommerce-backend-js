import { Router } from "express";

import { deleteUser, getActiveUser, getAllUsers, updateUser } from "#controllers/user.controller";
import { validateRequest, verifyJWT } from "#middlewares/index";
import { deleteUserSchema, updateUserSchema } from "#validators/user.validator";

/**
 * Express Router - for the user routes.
 *
 * @type {Router}
 */
const router = Router();

router.route("/").get(verifyJWT, getAllUsers);
router.route("/me").get(verifyJWT, getActiveUser);
router
	.route("/:id")
	.patch(validateRequest(updateUserSchema), updateUser)
	.delete(validateRequest(deleteUserSchema), deleteUser);

export default router;
