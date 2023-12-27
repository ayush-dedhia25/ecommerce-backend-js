import { Router } from "express";

import {
	createProfile,
	deleteProfile,
	getProfile,
	updateProfile,
} from "#controllers/profile.controller";
import { validateRequest, verifyJWT } from "#middlewares/index";
import {
	createProfileSchema,
	deleteProfileSchema,
	updateProfileSchema,
} from "#schemas/profile.schema";

/**
 * Profile Router.
 *
 * @type {Router}
 */
const router = Router();

router
	.route("/")
	.get(verifyJWT, getProfile)
	.post(verifyJWT, validateRequest(createProfileSchema), createProfile);

router
	.route("/:profileId")
	.patch(verifyJWT, validateRequest(updateProfileSchema), updateProfile)
	.delete(verifyJWT, validateRequest(deleteProfileSchema), deleteProfile);

export default router;
