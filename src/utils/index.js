export const sanitizeUser = (user) => {
	if (Array.isArray(user)) {
		return user.map((u) => u.sanitize());
	} else {
		return user.sanitize();
	}
};

export const selection = (select = "") => `${select} -__v -updatedAt`;
