import jwt from "jsonwebtoken";

import ApiError from "../lib/ApiError.js";
import asyncHandler from "../lib/asyncHandler.js";
import Config from "../lib/config.js";
import User from "../models/User.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
	try {
		// Extract the token from the cookie or request headers
		const token =
			req.cookies?.access_token ||
			req.header("Authorization")?.replace("Bearer ", "");
		if (!token) {
			throw new ApiError(401, "Unauthorized request");
		}

		// Decode the token and access the user info
		const decodedToken = jwt.verify(token, Config.jwt.accessTokenSecret);

		// Find the user in the database
		const user = await User.findById(decodedToken?.id).select(
			"-password -refreshToken -salt -__v"
		);
		if (!user) {
			throw new ApiError(401, "Invalid access token");
		}

		// Attach the user to the request object
		req.user = user;
		next();
	} catch (err) {
		throw new ApiError(401, err?.message || "Invalid access token");
	}
});

export default verifyJWT;
