import ApiError from "../lib/ApiError.js";

const globalErrorHandler = (err, req, res, next) => {
	// Handle ApiError
	if (err instanceof ApiError) {
		return res.status(err.statusCode).json(err.toJson());
	}

	// Handle miscellaneous errors
	return res.status(err.statusCode || 500).json({
		statusCode: err.statusCode || 500,
		data: null,
		message: err.message,
	});
};

export default globalErrorHandler;
