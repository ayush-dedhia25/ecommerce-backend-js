import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide product's name"],
		},
		description: {
			type: String,
			required: [true, "Please provide product's description"],
		},
		price: {
			type: String,
			required: [true, "Please provide product's price"],
		},
		stock: {
			type: String,
			required: [true, "Please provide product's stock availability"],
		},
		images: {
			type: [String],
		},
		rating: {
			type: Number,
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
