import { z } from "zod";

const profileSchema = z.object({
	firstName: z.string({ required_error: "Please provide your first name" }).trim(),
	lastName: z.string({ required_error: "Please provide your last name" }).trim(),
	addressLine1: z.string({ required_error: "Please provide your address" }).trim(),
	addressLine2: z.string().trim().optional(),
	landmark: z.string().trim().optional(),
	pincode: z
		.string()
		.trim()
		.refine((value) => /^\d{6}$/g.test(value), { message: "Invalid postal code" }),
	phone: z
		.string()
		.trim()
		.refine((value) => /^\d{10}$/g.test(value), { message: "Invalid phone number" }),
});

const createProfileSchema = z.object({
	body: profileSchema,
});

const updateProfileSchema = z.object({
	params: z.object({
		profileId: z.string(),
	}),
	body: profileSchema.partial(),
});

const deleteProfileSchema = z.object({
	params: z.object({
		profileId: z.string(),
	}),
});

export { createProfileSchema, deleteProfileSchema, updateProfileSchema };
