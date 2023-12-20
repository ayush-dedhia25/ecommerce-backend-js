import ApiError from "../lib/ApiError.js";
import ApiResponse from "../lib/ApiResponse.js";
import User from "../models/User.model.js";

export async function getAllUsers(req, res) {
	const users = await User.find();
	return res.status(200).json(new ApiResponse(200, users));
}

export async function createUser(req, res) {
	const { body } = req.parsedCtx;
	let user = null;
	// Check if the user already exists
	user = await User.findOne({ email: body.email });
	if (user) {
		throw new ApiError(409, "User already exists");
	}
	// Safe to create a new user
	user = new User({ username: body.username, email: body.email, password: body.password });
	await user.save();
	return res.status(201).json(new ApiResponse(200, user, "User created successfully"));
}

export async function updateUser(req, res) {
	const { params, body } = req.parsedCtx;
	let user = null;
	// Check if the user already exists
	user = await User.findById(params.id);
	if (!user) {
		throw new ApiError(404, "User does not exist");
	}
	// Update user
	user = await User.findOneAndUpdate({ email: user.email }, body, { new: true });
	return res.status(200).json(new ApiResponse(200, user, "User updated successfully"));
}

export async function deleteUser(req, res) {
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
}
