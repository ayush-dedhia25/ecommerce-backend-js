import { ApiError } from "./BaseError.js";

export class ConflictError extends ApiError {
	constructor(message, details = null) {
		const ConflictErrorStatusCode = 409;
		const message = message || "Conflict Error";

		super(message, ConflictErrorStatusCode, details);
	}
}
