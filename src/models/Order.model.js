import mongoose from "mongoose";

const orderModel = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Product",
				required: true,
			},
		],
		orderTotal: {
			type: Number,
			required: true,
		},
		shippingAddress: {
			type: mongoose.Types.ObjectId,
			ref: "Address",
			required: true,
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", orderModel);

export default Order;
