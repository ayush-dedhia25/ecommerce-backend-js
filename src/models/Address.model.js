import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
	{
		line1: {
			type: String,
			required: true,
		},
		line2: {
			type: String,
			required: true,
		},
		pincode: {
			type: String,
			required: true,
		},
		landmark: {
			type: String,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
