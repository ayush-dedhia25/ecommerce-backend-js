import { NotFoundError } from "#errors/index";
import { ApiResponse, asyncHandler } from "#lib/index";
import { Product } from "#models/index";
import { selection } from "#utils/index";

const findProductOrThrowError = async ({ by, select }) => {
	let product = null;
	if (by && typeof by === "string") {
		product = await Product.findById(by).select(selection(select));
	} else if (by && typeof by === "object") {
		product = await Product.findOne({ ...by }).select(selection(select));
	}

	if (!product) throw new NotFoundError("Product not found");
	return product;
};

export const getAllProducts = asyncHandler(async (req, res) => {
	const products = await Product.find();
	return res.status(200).json(new ApiResponse(200, products));
});

export const getProduct = asyncHandler(async (req, res) => {
	const { params } = req.parsedCtx;

	const product = await findProductOrThrowError(params.productId);

	return res.status(200).json(new ApiResponse(200, product));
});

export const createProduct = asyncHandler(async (req, res) => {
	const { body } = req.parsedCtx;
	const user = req.user;

	// Create a new product
	const product = new Product({ ...body, creator: user._id });
	void (await product.save());

	return res.status(200).json(new ApiResponse(201, product));
});

export const updateProduct = asyncHandler(async (req, res) => {
	const { body, params } = req.parsedCtx;

	// Get the existing product
	const productExists = await findProductOrThrowError({ by: params.productId });

	// Create a new product
	const product = await Product.findByIdAndUpdate(productExists._id, body, { new: true }).select(
		// util method to deselect unnecessary fields
		selection()
	);

	return res.status(200).json(new ApiResponse(201, product));
});

export const deleteProduct = asyncHandler(async (req, res) => {
	const { params } = req.parsedCtx;

	// Check if the product already exists
	const product = await findProductOrThrowError({ by: params.productId });

	// Delete the product from the database
	const result = await Product.deleteOne({ _id: product._id });
	if (!result.deletedCount) {
		throw new InternalServerError("Something went wrong while deleting the product");
	}

	// Return empty response i.e. with no content
	return res.status(204).end();
});
