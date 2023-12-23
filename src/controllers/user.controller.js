import ApiError from "../lib/ApiError.js";
import ApiResponse from "../lib/ApiResponse.js";
import asyncHandler from "../lib/asyncHandler.js";
import User from "../models/User.model.js";
import { sanitizeUser } from "../utils/index.js";

const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select("-password -salt -__v");
	return res.status(200).json(new ApiResponse(200, users));
});

const createUser = asyncHandler(async (req, res) => {
	const { body } = req.parsedCtx;
	let user = null;
	// Check if the user already exists
	user = await User.findOne({ email: body.email });
	if (user) {
		throw new ApiError(409, "User already exists");
	}
	// Safe to create a new user
	user = new User({
		username: body.username,
		email: body.email,
		password: body.password,
	});
	void (await user.save());
	return res
		.status(201)
		.json(
			new ApiResponse(200, sanitizeUser(user), "User created successfully")
		);
});

const updateUser = asyncHandler(async (req, res) => {
	const { params, body } = req.parsedCtx;
	let user = null;
	// Check if the user already exists
	user = await User.findById(params.id);
	if (!user) {
		throw new ApiError(404, "User does not exist");
	}
	// Update user
	user = await User.findOneAndUpdate({ email: user.email }, body, {
		new: true,
	});
	return res
		.status(200)
		.json(new ApiResponse(200, user, "User updated successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
	const { params } = req.parsedCtx;
	// Check if the user already exists
	let user = await User.findById(params.id);
	if (!user) {
		throw new ApiError(404, "User does not exist");
	}
	// Delete the user from the database
	const result = await User.deleteOne({ email: user.email });
	if (!result.deletedCount) {
		throw new ApiError(500, "Something went wrong while deleting the user");
	}
	return res.status(204).json();
});

const getActiveUser = asyncHandler((req, res) => {
	return res.status(200).json(new ApiResponse(200, req.user));
});

export { createUser, deleteUser, getActiveUser, getAllUsers, updateUser };
