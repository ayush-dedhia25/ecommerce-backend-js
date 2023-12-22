import mongoose from "mongoose";

import Config from "./config.js";

const connectToMongoDB = async () => {
	try {
		const mongoDBUrl = Config.mongoURI;
		const instance = await mongoose.connect(mongoDBUrl);
		console.info("✅ Mongodb Connection Succeeded.");
		console.info(`🗃️  DB Host: ${instance.connection.host}`);
	} catch (error) {
		console.log("⚠ Mongodb connection error:", error);
		process.exit(1);
	}
};

export default connectToMongoDB;
