import { ApiError } from "./BaseError.js";

export class ConflictError extends ApiError {
	constructor(message, details = null) {
		const ConflictErrorStatusCode = 409;
		const _message = message || "Conflict Error";

		super(_message, ConflictErrorStatusCode, details);
	}
}
