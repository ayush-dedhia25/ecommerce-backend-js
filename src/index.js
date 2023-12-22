import dotenv from "dotenv";

import app from "./app.js";
import Config from "./lib/config.js";
import connectToMongoDB from "./lib/connect.js";

// Configure environment variables
dotenv.config({});

(async function () {
	// Connect to the mongodb database
	await connectToMongoDB();

	// Start the server
	const PORT = Config.serverPort;
	app.listen(PORT, () => {
		console.log(`🚀 Server up and running at http://localhost:${PORT}/`);
	});

	// Listen for any unhandled exceptions thrown by the server
	app.on("error", (error) => {
		console.log(error);
		throw error;
	});

	// Handle Unhandled promise rejections thrown by the server
	process.on("unhandledRejection", (reason, promise) => {
		console.log(
			"Encountered Unhandled Rejection at:",
			promise,
			"reason:",
			reason
		);
		process.exit(1);
	});
})();
