import { Router } from "express";

import {
	deleteUser,
	getActiveUser,
	getAllUsers,
	updateUser,
} from "../controllers/user.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js";
import validateRequest from "../middlewares/validateRequestData.middleware.js";
import {
	deleteUserSchema,
	updateUserSchema,
} from "../validators/user.validator.js";

const router = Router();

router.route("/").get(verifyJwt, getAllUsers);
router.route("/me").get(verifyJwt, getActiveUser);
router
	.route("/:id")
	.patch(validateRequest(updateUserSchema), updateUser)
	.delete(validateRequest(deleteUserSchema), deleteUser);

export default router;
