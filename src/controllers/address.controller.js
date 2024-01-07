import { InternalServerError } from "#errors/index";
import { ApiResponse, asyncHandler } from "#lib/index";
import { Address } from "#models/index";

export const getAddresses = asyncHandler(async (req, res) => {
	// Get the currently logged in user
	const user = req.user;

	// Fetch all the addresses of the currently logged in user from the mongodb database
	const address = await Address.find({ user: user._id });

	return res.status(200).json(new ApiResponse(200, address));
});

export const updateAddress = asyncHandler(async (req, res) => {
	const { params, body } = req.parsedCtx;

	// Perform the partial update as its a Patch Request
	const address = await Address.findByIdAndUpdate(
		params.addressId,
		{
			...(body.addressLine1 ? { line1: body.addressLine1 } : {}),
			...(body.addressLine2 ? { line2: body.addressLine2 } : {}),
			...(body.pincode ? { pincode: body.pincode } : {}),
			...(body.landmark ? { landmark: body.landmark } : {}),
		},
		{ new: true }
	).select("-__v -updatedAt -createdAt");

	return res.status(200).json(new ApiResponse(200, address, "Profile updated successfully"));
});

export const deleteAddress = asyncHandler(async (req, res) => {
	const { params } = req.parsedCtx;

	const addressToDelete = await Address.deleteOne({ _id: params.addressId });
	if (!addressToDelete.deletedCount) {
		throw new InternalServerError(
			"Something went wrong while deleting the user address, please try again"
		);
	}

	return res.status(204).json();
});
