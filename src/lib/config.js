import dotenv from "dotenv";

// Configure environment variables
dotenv.config({});

/**
 * Application configuration settings.
 */
class Config {
	// App Configuration
	static App = {
		Version: process.env.APP_VERSION || "1.0",
		Environment: process.env.NODE_ENV || "development",
		Port: process.env.PORT || 3000,
	};

	// JWT Configuration
	static Jwt = {
		AccessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "My_Token_Secret",
		AccessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRATION || "1h",
		RefreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "My_Token_Secret",
		RefreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRATION || "3d",
		Algorithm: process.env.JWT_ALGORITHM || "RS256",
	};

	static Database = {
		Uri: process.env.DATABASE_URL || "",
	};
}

export default Config;
