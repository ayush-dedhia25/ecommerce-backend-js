import { ApiError, ApiResponse, asyncHandler } from "#lib/index";
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
	// Create a new profile
	const profile = new Profile({ ...body, user: user._id });
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
