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
		address: {
			type: mongoose.Types.ObjectId,
			ref: "Address",
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
