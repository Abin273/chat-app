import mongoose, { Schema, Model } from "mongoose";

const userSchema = new Schema({
	name: String,
	email: String,
	password: String,
});
