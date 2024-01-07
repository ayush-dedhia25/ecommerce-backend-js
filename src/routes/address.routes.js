import { Router } from "express";

import { deleteAddress, getAddresses, updateAddress } from "#controllers/address.controller";
import { validateRequestInput, verifyJWT } from "#middlewares/index";
import { deleteAddressSchema, updateAddressSchema } from "#schemas/index";

/**
 * Auth Router.
 *
 * @type {Router}
 */
const router = Router();

router.route("/").get(verifyJWT, getAddresses);

router
	.route("/:addressId")
	.patch(verifyJWT, validateRequestInput(updateAddressSchema), updateAddress)
	.delete(verifyJWT, validateRequestInput(deleteAddressSchema), deleteAddress);

export default router;
