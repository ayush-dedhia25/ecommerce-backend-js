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
app.get("/ping", (req, res) => {
	res.status(200).json({ message: "pong" });
});

import { globalErrorHandler, jwtErrorHandler } from "./error-handlers/index.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

// Register all the error handlers
app.use(jwtErrorHandler); // Jwt specific error handler
app.use(globalErrorHandler); // Global error handler

export default app;
