import { Router } from "express";

import { createUser, deleteUser, getAllUsers, updateUser } from "../controllers/user.controller.js";
import asyncHandler from "../lib/asyncHandler.js";
import validateRequestData from "../middlewares/validateRequestData.middleware.js";
import {
	createUserSchema,
	deleteUserSchema,
	updateUserSchema,
} from "../validators/user.validator.js";

const router = Router();

router
	.route("/")
	.get(asyncHandler(getAllUsers))
	.post(validateRequestData(createUserSchema), asyncHandler(createUser));

router
	.route("/:id")
	.patch(validateRequestData(updateUserSchema), asyncHandler(updateUser))
	.delete(validateRequestData(deleteUserSchema), asyncHandler(deleteUser));

export default router;
