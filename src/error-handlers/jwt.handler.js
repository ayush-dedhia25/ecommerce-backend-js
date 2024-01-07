import { AuthorizationError } from "#errors/index";
import jwt from "jsonwebtoken";

const jwtErrorHandler = (err, req, res, next) => {
	const errorResponder = (error) => {
		if (error instanceof jwt.JsonWebTokenError) {
			if (err.message === "jwt malformed") {
				return new AuthorizationError("Unauthorized Access", "Malformed token provided");
			} else if (err.message === "invalid signature") {
				return new AuthorizationError(
					"Unauthorized Access",
					"Seems like the token has been tempered, please check or login again to issue a new token"
				);
			} else {
				return new AuthorizationError("Unauthorized Access", "Invalid token provided");
			}
		} else if (error instanceof jwt.TokenExpiredError) {
			return new AuthorizationError("Token is expired, please issue a new access token");
		}
	};

	const jwtError = errorResponder(err);
	// If the error is null that means error is not related to JWT, so we can pass forward the error
	// so the other handler can handle the error
	if (!jwtError) {
		next(err);
	} else {
		return res.status(jwtError.statusCode).json(jwtError.toJson());
	}
};

export default jwtErrorHandler;
