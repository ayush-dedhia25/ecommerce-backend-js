import { Config, connectToMongoDB } from "#lib/index";
import app from "./app.js";

(async function () {
	// Connect to the mongodb database
	await connectToMongoDB();

	// Start the server
	const PORT = Config.App.Port;
	app.listen(PORT, () => {
		console.log(`🚀 API loaded and running at path http://localhost:${PORT}/api/v1`);
	});

	// Listen for any unhandled exceptions thrown by the server
	app.on("error", (error) => {
		console.log(error);
		throw error;
	});

	// Handle Unhandled promise rejections thrown by the server
	process.on("unhandledRejection", (reason, promise) => {
		console.log("Encountered Unhandled Rejection at:", promise, "reason:", reason);
		process.exit(1);
	});
})();
