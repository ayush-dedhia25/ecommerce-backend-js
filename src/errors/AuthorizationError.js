import { ApiError } from "./BaseError.js";

export class AuthorizationError extends ApiError {
	constructor(message, details = null) {
		const InternalServerErrorStatusCode = 409;
		const _message = message || "Internal Server Error";

		super(_message, InternalServerErrorStatusCode, details);
	}
}
