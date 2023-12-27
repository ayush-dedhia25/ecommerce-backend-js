import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		addressLine1: {
			type: String,
			required: true,
		},
		addressLine2: {
			type: String,
		},
		pincode: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
