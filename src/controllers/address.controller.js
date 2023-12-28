import { ApiResponse, asyncHandler } from "#lib/index";
import Address from "#models/Address.model";

const getAddresses = asyncHandler(async (req, res) => {
	// Get the currently logged in user
	const user = req.user;
	// Fetch all the addresses of the currently logged in user from the mongodb database
	const address = await Address.find({ user: user._id });
	return res.status(200).json(new ApiResponse(200, address));
});

const updateAddress = asyncHandler(async (req, res) => {
	const { params, body } = req.parsedCtx;
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

const deleteAddress = asyncHandler(async (req, res) => {
	const { params } = req.parsedCtx;
	const addressToDelete = await Address.deleteOne({ _id: params.addressId });
	if (!addressToDelete.deletedCount) {
		throw new ApiError(
			500,
			"Something went wrong while deleting the user address, please try again"
		);
	}
	return res.status(204).json();
});

export { deleteAddress, getAddresses, updateAddress };
