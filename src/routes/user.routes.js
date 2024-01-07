import { Router } from "express";

import { deleteUser, getActiveUser, getAllUsers, updateUser } from "#controllers/user.controller";
import { validateRequestInput, verifyJWT } from "#middlewares/index";
import { deleteUserSchema, updateUserSchema } from "#schemas/index";

/**
 * User Router
 *
 * @type {Router}
 */
const router = Router();

router.route("/").get(verifyJWT, getAllUsers);
router.route("/me").get(verifyJWT, getActiveUser);
router
	.route("/:id")
	.patch(validateRequestInput(updateUserSchema), updateUser)
	.delete(validateRequestInput(deleteUserSchema), deleteUser);

export default router;
