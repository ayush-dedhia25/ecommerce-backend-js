import { z } from "zod";

export const createUserSchema = z.object({
	body: z.object({
		username: z.string({ required_error: "Username must not be empty" }),
		email: z
			.string({ required_error: "Please provide your email address" })
			.email("Provided email address is not valid"),
		password: z.string().min(6, "Password must be at least 6 characters long"),
	}),
});

export const updateUserSchema = z
	.object({
		params: z.object({ id: z.string() }),
		body: z.object({ username: z.string().optional(), email: z.string().optional() }),
	})
	.refine(({ body }) => body.username === undefined || body.email === undefined, {
		message: "Either username or email is required",
	});

export const deleteUserSchema = z.object({
	params: z.object({ id: z.string() }),
});
