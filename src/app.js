import express from "express";

/**
 * Express Server
 *
 * @type {import("express").Application}
 */
const app = express();

// Configure express server
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Test server endpoint
app.get("/api/v1/test-end", (req, res) => {
	res.status(200).json({ ping: "pong" });
});

import errorHandler from "./lib/error-handler.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

// Global error handler
app.use(errorHandler);

export default app;
