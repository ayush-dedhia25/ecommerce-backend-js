import mongoose from "mongoose";

async function connectToMongoDB() {
	try {
		const instance = await mongoose.connect(process.env.DATABASE_URL);
		console.info("✅ Mongodb Connection Succeeded.");
		console.info(`🗃️  DB Host: ${instance.connection.host}`);
	} catch (error) {
		console.log("⚠ Mongodb connection error:", error);
		process.exit(1);
	}
}

export default connectToMongoDB;
