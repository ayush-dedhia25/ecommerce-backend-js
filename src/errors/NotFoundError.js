import { ApiError } from "./BaseError.js";

export class NotFoundError extends ApiError {
	constructor(message, details = null) {
		const NotFoundErrorStatusCode = 404;
		const message = message || "Not Found Error";

		super(message, NotFoundErrorStatusCode, details);
	}
}
