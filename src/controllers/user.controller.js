import { ConflictError, InternalServerError, NotFoundError } from "#errors/index";
import { ApiResponse, asyncHandler } from "#lib/index";
import { User } from "#models/index";
import { sanitizeUser } from "#utils/index";

export const findUserOrThrowError = async ({ by, select = "" }) => {
	let user = null;
	if (by && typeof by === "string") {
		const userId = by;
		user = await User.findById(userId).select(select);
	} else if (by && typeof by === "object") {
		user = await User.findOne({ ...by }).select(select);
	}

	// Throw error if user is not found
	if (!user) {
		throw new NotFoundError("User not found");
	}

	return user;
};

export const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select("-password -salt -__v");
	return res.status(200).json(new ApiResponse(200, users));
});

export const createUser = asyncHandler(async (req, res) => {
	const { body } = req.parsedCtx;

	// Check if the user already exists
	let user = null;
	user = await User.findOne({ email: body.email });
	if (user) {
		throw new ConflictError("User already exists");
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
		.json(new ApiResponse(200, sanitizeUser(user), "User created successfully"));
});

export const updateUser = asyncHandler(async (req, res) => {
	const { params, body } = req.parsedCtx;

	// Check if the user already exists
	const userExists = await findUserOrThrowError({ by: params.id });

	// Update user
	const user = await User.findOneAndUpdate({ email: userExists.email }, body, {
		new: true,
	}).select("-password -salt -refreshToken -__v");

	return res.status(200).json(new ApiResponse(200, user, "User updated successfully"));
});

export const deleteUser = asyncHandler(async (req, res) => {
	const { params } = req.parsedCtx;

	// Check if the user already exists
	const user = await findUserOrThrowError({ by: params.id });

	// Delete the user from the database
	const result = await User.deleteOne({ email: user.email });
	if (!result.deletedCount) {
		throw new InternalServerError("Something went wrong while deleting the user");
	}

	// Return empty response i.e. with no content
	return res.status(204).end();
});

export const getActiveUser = asyncHandler((req, res) => {
	return res.status(200).json(new ApiResponse(200, req.user));
});
