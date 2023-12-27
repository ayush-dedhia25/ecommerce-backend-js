import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import Config from "#lib/config";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			lowercase: true,
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
		profile: {
			type: mongoose.Types.ObjectId,
			ref: "Profile",
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
	delete user.refreshToken;
	delete user.salt;
	delete user.__v;
	return user;
};

userSchema.methods.isPasswordCorrect = async function (textPassword) {
	return await bcrypt.compare(textPassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			id: this._id,
			email: this.email,
		},
		Config.Jwt.AccessTokenSecret,
		{
			expiresIn: Config.Jwt.AccessTokenExpiry,
		}
	);
};

userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			id: this._id,
			email: this.email,
		},
		Config.Jwt.RefreshTokenSecret,
		{
			expiresIn: Config.Jwt.RefreshTokenExpiry,
		}
	);
};

const User = mongoose.model("User", userSchema);

export default User;
