import jwt from "jsonwebtoken";

import { AuthorizationError } from "#errors/index";
import { asyncHandler, Config } from "#lib/index";
import { User } from "#models/index";

const verifyJWT = asyncHandler(async (req, res, next) => {
	try {
		// Extract the token from the cookie or request headers
		const token =
			req.cookies?.access_token || req.header("Authorization")?.replace("Bearer ", "");
		if (!token) {
			throw new AuthorizationError("Unauthorized request");
		}

		// Decode the token and access the user info
		const decodedToken = jwt.verify(token, Config.Jwt.AccessTokenSecret);

		// Find the user in the database
		const user = await User.findById(decodedToken?.id).select(
			"-password -refreshToken -salt -__v"
		);
		if (!user) {
			throw new AuthorizationError("Invalid access token");
		}

		// Attach the user to the request object
		req.user = user;
		next();
	} catch (err) {
		throw next(err);
	}
});

export default verifyJWT;
