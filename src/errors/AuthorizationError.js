import { ApiError } from "./BaseError.js";

export class AuthorizationError extends ApiError {
	constructor(message, details = null) {
		const InternalServerErrorStatusCode = 409;
		const message = message || "Internal Server Error";

		super(message, InternalServerErrorStatusCode, details);
	}
}
