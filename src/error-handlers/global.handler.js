import { ApiError } from "../errors/BaseError.js";

const globalErrorHandler = (err, req, res, next) => {
	// Handle ApiError
	if (err instanceof ApiError) {
		return res.status(err.statusCode).json(err.toJSON());
	}

	// Handle miscellaneous errors
	return res.status(err.statusCode || 500).json({
		statusCode: err.statusCode || 500,
		error: err.message,
	});
};

export default globalErrorHandler;
