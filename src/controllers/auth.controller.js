import jwt from "jsonwebtoken";

import { AuthorizationError, NotFoundError } from "#errors/index";
import { ApiResponse, asyncHandler, Config, generateTokens } from "#lib/index";
import { User } from "#models/index";

export const login = asyncHandler(async (req, res) => {
	const { body } = req.parsedCtx;

	// Try to find the user in the database
	const user = await User.findOne({ email: body.email });
	if (!user) {
		throw new NotFoundError("User does not exist!");
	}

	// Check if the user's password is correct
	const isPasswordCorrect = await user.isPasswordCorrect(body.password);
	if (!isPasswordCorrect) {
		throw new AuthorizationError("Password is incorrect!");
	}

	// Generate tokens for the further requests
	const { accessToken, refreshToken } = await generateTokens(user._id);
	const loggedInUser = await User.findById(user._id).select("-password -salt -refreshToken -__v");

	return res.status(200).json(
		new ApiResponse(
			200,
			{
				user: loggedInUser,
				access_token: accessToken,
				refresh_token: refreshToken,
			},
			"User logged in successfully"
		)
	);
});

export const refreshToken = asyncHandler(async (req, res) => {
	// Get the existing refresh token from the client via cookies or body
	const refreshTokenFromRequest = req.cookies?.refreshToken || req.body.refresh_token;
	if (!refreshTokenFromRequest) {
		throw new AuthorizationError("Unauthorized access");
	}

	try {
		// Verify the refresh token
		const decodedToken = jwt.verify(refreshTokenFromRequest, Config.Jwt.RefreshTokenSecret);

		// Find the user with the refresh token info
		const user = await User.findById(decodedToken?.id);
		if (!user) {
			throw new AuthorizationError("Invalid refresh token");
		}

		// Check if the refresh token provided by the client is same as stored in the database
		if (refreshTokenFromRequest !== user.refreshToken) {
			throw new AuthorizationError("Refresh token is expired or used");
		}

		// Generate new set of tokens
		const { accessToken, refreshToken } = await generateTokens(user._id);
		return res
			.status(200)
			.json(
				new ApiResponse(
					200,
					{ access_token: accessToken, refresh_token: refreshToken },
					"Tokens generated successfully"
				)
			);
	} catch (err) {
		throw new AuthorizationError(err?.message || "Invalid refresh token");
	}
});
