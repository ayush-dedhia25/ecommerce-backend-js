import { z } from "zod";

const updateAddressSchema = z.object({
	params: z.object({
		addressId: z.string(),
	}),
	body: z.object({
		addressLine1: z.string().optional(),
		addressLine2: z.string().optional(),
		pincode: z.string().optional(),
		landmark: z.string().optional(),
	}),
});

const deleteAddressSchema = z.object({
	params: z.object({
		addressId: z.string(),
	}),
});

export { deleteAddressSchema, updateAddressSchema };
