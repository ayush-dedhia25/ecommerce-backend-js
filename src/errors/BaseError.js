export class ApiError extends Error {
	#statusCode = 500;
	#details = null;

	constructor(message, statusCode, details) {
		super(message);

		this.name = this.constructor.name;
		this.message = message || "Something went wrong. Try again.";
		this.#statusCode = statusCode || 500;
		if (details) {
			this.#details = details;
		}

		Error.captureStackTrace(this, this.constructor);
	}

	get statusCode() {
		return this.#statusCode;
	}

	get details() {
		return this.#details;
	}

	toJSON() {
		return {
			statusCode: this.#statusCode,
			error: this.message,
			...(this.#details ? { details: this.#details } : {}),
			success: false,
		};
	}
}
