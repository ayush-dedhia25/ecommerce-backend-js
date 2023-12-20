import express from "express";

import ApiError from "./lib/ApiError.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

// Configure express server
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Test server endpoint
app.get("/api/v1/test-end", (req, res) => {
	res.status(200).json({ ping: "pong" });
});

app.use("/api/v1/users", userRoutes);

app.use((err, req, res, next) => {
	// Handle ApiError
	if (err instanceof ApiError) {
		return res.status(err.statusCode).json(err.toJson());
	}
	// Handle miscellaneous errors
	return res.status(err.statusCode || 500).json({
		statusCode: err.statusCode || 500,
		data: null,
		message: err.message,
	});
});

export default app;
