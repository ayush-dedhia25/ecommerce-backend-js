import jwt from "jsonwebtoken";
import Config from "./config.js";

const ALGORITHM = Config.jwt.algorithm;

const generateJWTAccessToken = (payload) => {
	const accessTokenSecret = Config.jwt.accessTokenSecret;
	const accessTokenExpiry = Config.jwt.accessTokenExpiry;

	return jwt.sign(payload, accessTokenSecret, {
		expiresIn: accessTokenExpiry,
	});
};

const generateJWTRefreshToken = (payload) => {
	const refreshTokenSecret = Config.jwt.refreshTokenSecret;
	const refreshTokenExpiry = Config.jwt.refreshTokenExpiry;

	return jwt.sign(payload, refreshTokenSecret, {
		expiresIn: refreshTokenExpiry,
	});
};

export { generateJWTAccessToken, generateJWTRefreshToken };
