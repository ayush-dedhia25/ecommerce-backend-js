import User from "../models/User.model.js";
import ApiError from "./ApiError.js";

const generateTokens = async (userId) => {
	try {
		const user = await User.findById(userId);
		console.log("🚀 ~ file: jwt.js:30 ~ generateTokens ~ user:", user);
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken;
		void (await user.save());

		return { accessToken, refreshToken };
	} catch (error) {
		console.log("🚀 ~ file: jwt.js:38 ~ generateTokens ~ error:", error);
		throw new ApiError(
			500,
			"Something went wrong while generating access tokens"
		);
	}
};

export { generateTokens };
