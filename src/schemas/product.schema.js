import { z } from "zod";

export const createProductSchema = z.object({
	body: z.object({
		name: z.string({ required_error: "product name is required" }),
		description: z.string().optional(),
		category: z.string({ required_error: "product category is required" }),
		price: z.coerce.number({ required_error: "product price is required" }),
		stock: z.coerce.number({ required_error: "product stock count is required" }),
		images: z.array(z.string()).min(1, { message: "At least one image is required" }),
	}),
});

export const productIdSchema = z.object({
	productId: z.string({ required_error: "productId not provided via path params" }),
});

export const updateProductSchema = z.object({
	params: productIdSchema,
	body: z.object({
		name: z.string().optional(),
		description: z.string().optional(),
		category: z.string().optional(),
		price: z.coerce.number().optional(),
		stock: z.coerce.number().optional(),
		images: z.array(z.string()).optional(),
	}),
});
