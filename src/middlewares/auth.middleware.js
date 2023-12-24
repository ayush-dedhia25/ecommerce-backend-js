import jwt from "jsonwebtoken";

import { ApiError, asyncHandler, Config } from "../lib/index.js";
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
		const decodedToken = jwt.verify(token, Config.Jwt.AccessTokenSecret);

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
		throw next(err);
	}
});

export default verifyJWT;
