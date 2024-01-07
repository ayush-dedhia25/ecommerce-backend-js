import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
	{
		comment: { type: String },
		rating: { type: Number },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
