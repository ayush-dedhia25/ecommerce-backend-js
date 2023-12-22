import ApiError from "../lib/ApiError.js";
import ApiResponse from "../lib/ApiResponse.js";
import asyncHandler from "../lib/asyncHandler.js";
import User from "../models/User.model.js";
import { sanitizeUser } from "../utils/index.js";

const login = asyncHandler(async (req, res) => {
	const { body } = req.parsedCtx;

	// Try to find the user in the database
	const user = await User.findOne({ email: body.email });
	if (!user) {
		throw new ApiError(404, "User does not exist!");
	}

	// Check if the user's password is correct
	const isPasswordCorrect = await user.isPasswordCorrect(body.password);
	if (!isPasswordCorrect) {
		throw new ApiError(401, "Password is incorrect!");
	}

	// Generate JWT token
	const accessToken = user.generateAccessToken();
	const sanitizedUser = sanitizeUser(user);
	Object.assign(sanitizedUser, { access_token: accessToken });

	return res.status(200).json(new ApiResponse(200, sanitizedUser));
});

export { login };
