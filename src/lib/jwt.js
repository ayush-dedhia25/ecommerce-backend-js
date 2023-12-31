import { InternalServerError } from "#errors/index";
import User from "#models/User.model";

const generateTokens = async (userId) => {
	try {
		const user = await User.findById(userId);
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken;
		void (await user.save());

		return { accessToken, refreshToken };
	} catch (error) {
		throw new InternalServerError("Something went wrong while generating access tokens");
	}
};

export { generateTokens };
