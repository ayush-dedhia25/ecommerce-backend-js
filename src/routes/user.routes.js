import { Router } from "express";

import {
	deleteUser,
	getAllUsers,
	updateUser,
} from "../controllers/user.controller.js";
import validateRequestData from "../middlewares/validateRequestData.middleware.js";
import {
	deleteUserSchema,
	updateUserSchema,
} from "../validators/user.validator.js";

const router = Router();

router.route("/").get(getAllUsers);

router
	.route("/:id")
	.patch(validateRequestData(updateUserSchema), updateUser)
	.delete(validateRequestData(deleteUserSchema), deleteUser);

export default router;
