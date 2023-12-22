import { z } from "zod";

const loginSchema = z.object({
	params: z.object({}),
	body: z.object({
		email: z
			.string({ required_error: "Please provide your email address" })
			.email({ message: "Invalid email address" }),
		password: z.string({ required_error: "Please provide your password" }),
	}),
});

export { loginSchema };
