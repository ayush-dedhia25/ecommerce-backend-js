import { BadRequestError } from "#errors/index";

const validateRequestInput = (schema) => {
	return async (req, res, next) => {
		// Validating the input request data
		const input = schema.safeParse({
			params: req.params,
			body: req.body,
		});

		// Return validation error response
		if (!input.success) {
			const details = input.error.issues.reduce((acc, issue) => {
				const fieldName = issue.path[1];
				acc[fieldName] = issue.message;
				return acc;
			}, {});

			const error = new BadRequestError("Validation failed", details);
			return res.status(error.statusCode).json(error.toJson());
		}

		// Hook the validated and parsed data to the request object
		req.parsedCtx = input.data;
		next();
	};
};

export default validateRequestInput;
