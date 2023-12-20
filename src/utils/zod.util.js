const extractValidationErrors = (error) => {
	return error.errors.map((err) => ({
		path: err.path.join("."),
		message: err.message,
	}));
};

export { extractValidationErrors };
