import * as bcrypt from "bcrypt";
import mongoose from "mongoose";

import { generateJWTAccessToken, generateJWTRefreshToken } from "../lib/jwt.js";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		refreshToken: {
			type: String,
		},
		salt: {
			type: String,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		try {
			const salt = await bcrypt.genSalt(10);
			const hashedVersion = await bcrypt.hash(this.password, salt);
			this.password = hashedVersion;
			this.salt = salt;
			next();
		} catch (err) {
			return next(err);
		}
	}
	return next();
});

userSchema.methods.sanitize = function () {
	const user = this.toObject();
	delete user.password;
	delete user.salt;
	delete user.__v;
	return user;
};

userSchema.methods.isPasswordCorrect = async function (textPassword) {
	return await bcrypt.compare(textPassword, this.password);
};

userSchema.methods.generateAccessToken = function (textPassword) {
	return generateJWTAccessToken({
		id: this._id,
		email: this.email,
	});
};

userSchema.methods.generateRefreshToken = function (textPassword) {
	return generateJWTRefreshToken({
		id: this._id,
		email: this.email,
	});
};

const User = mongoose.model("User", userSchema);

export default User;
