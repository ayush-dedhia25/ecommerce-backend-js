import { ApiError } from "./BaseError.js";

export class BadRequestError extends ApiError {
	constructor(message, details = null) {
		const BadRequestErrorStatusCode = 400;
		const _message = message || "Bad Request Error";

		super(_message, BadRequestErrorStatusCode, details);
	}
}
