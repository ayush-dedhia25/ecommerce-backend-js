import { ApiError } from "./BaseError.js";

export class NotFoundError extends ApiError {
	constructor(message, details = null) {
		const NotFoundErrorStatusCode = 404;
		const _message = message || "Not Found Error";

		super(_message, NotFoundErrorStatusCode, details);
	}
}
