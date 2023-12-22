import { extractValidationErrors } from "./zod.util.js";

const sanitizeUser = (user) => {
	if (Array.isArray(user)) {
		return user.map((u) => u.sanitize());
	} else {
		return user.sanitize();
	}
};

export { extractValidationErrors, sanitizeUser };
