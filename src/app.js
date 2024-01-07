import express from "express";
import morgan from "morgan";

/**
 * Express Server
 *
 * @type {import("express").Application}
 */
const app = express();

// Configure mandatory global middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(morgan("dev"));

// Test server endpoint
app.get("/ping", (req, res) => {
	res.status(200).json({ message: "pong" });
});

import { globalErrorHandler, jwtErrorHandler } from "#error-handlers/index";
import { addressRoutes, authRoutes, profileRoutes, userRoutes } from "#routes/index";

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/address", addressRoutes);

// Register all the error handlers
app.use(jwtErrorHandler); // Jwt specific error handler
app.use(globalErrorHandler); // Global error handler

export default app;
