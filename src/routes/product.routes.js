import { Router } from "express";

import { createProduct, deleteProduct, getAllProducts, updateProduct } from "#controllers/product.controller";
import { validateRequestInput, verifyJWT } from "#middlewares/index";
import { createProductSchema, productIdSchema, updateProductSchema } from "#schemas/product.schema";

/**
 * Product Router
 *
 * @type {Router}
 */
const router = Router();

router.route("/").get(verifyJWT, getAllProducts);
router.route("/create").post(verifyJWT, validateRequestInput(createProductSchema), createProduct);
router
	.route("/:productId")
	.patch(verifyJWT, validateRequestInput(updateProductSchema), updateProduct)
	.delete(verifyJWT, validateRequestInput(productIdSchema), deleteProduct);

export default router;
