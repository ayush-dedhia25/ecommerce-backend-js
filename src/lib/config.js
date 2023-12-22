import dotenv from "dotenv";

// Parse and load the environment variables
dotenv.config({});

class Config {
	static appVersion = process.env.APP_VERSION || "1.0";
	static nodeEnvironment = process.env.NODE_ENV || "development";

	// JWT Configuration
	static jwt = {
		accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "My_Token_Secret",
		accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRATION || "1h",
		refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "My_Token_Secret",
		refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRATION || "3d",
		algorithm: process.env.JWT_ALGORITHM || "RS256",
	};

	static mongoURI = process.env.DATABASE_URL;
	static serverPort = process.env.PORT || 3000;
}

export default Config;
