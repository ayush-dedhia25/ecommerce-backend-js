import { Router } from "express";

import {
	createProfile,
	deleteProfile,
	getProfile,
	updateProfile,
} from "#controllers/profile.controller";
import { validateRequestInput, verifyJWT } from "#middlewares/index";
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
	.post(verifyJWT, validateRequestInput(createProfileSchema), createProfile);

router
	.route("/:profileId")
	.patch(verifyJWT, validateRequestInput(updateProfileSchema), updateProfile)
	.delete(verifyJWT, validateRequestInput(deleteProfileSchema), deleteProfile);

export default router;
