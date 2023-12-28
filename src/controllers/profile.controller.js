import { ApiError, ApiResponse, asyncHandler } from "#lib/index";
import Address from "#models/Address.model";
import Profile from "#models/Profile.model";

const getProfile = asyncHandler(async (req, res) => {
	const user = req.user;
	const profile = await Profile.aggregate([{ $match: { user: user._id } }]);
	return res.status(200).json(new ApiResponse(200, profile));
});

const createProfile = asyncHandler(async (req, res) => {
	const { body } = req.parsedCtx;
	// Get the current logged in user
	const user = req.user;

	// Create a new address
	const address = new Address({
		line1: body.addressLine1,
		line2: body?.addressLine2,
		pincode: body.pincode,
		landmark: body?.landmark,
		user: user._id,
	});
	void (await address.save());

	// Create a new profile
	const profile = new Profile({
		firstName: body.firstName,
		lastName: body.lastName,
		phone: body.phone,
		user: user._id,
		address: address._id,
	});
	void (await profile.save());

	return res.status(201).json(new ApiResponse(201, profile, "Profile created successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
	const { params, body } = req.parsedCtx;
	const profile = await Profile.findByIdAndUpdate(
		params.profileId,
		{ $set: { ...body } },
		{ new: true }
	).select("-__v -updatedAt -createdAt");
	return res.status(200).json(new ApiResponse(200, profile, "Profile updated successfully"));
});

const deleteProfile = asyncHandler(async (req, res) => {
	const { params } = req.parsedCtx;
	const profileToDelete = await Profile.deleteOne({ _id: params.profileId });
	if (!profileToDelete.deletedCount) {
		throw new ApiError(500, "Something went wrong while deleting profile, please try again");
	}
	return res.status(204).json();
});

export { createProfile, deleteProfile, getProfile, updateProfile };
