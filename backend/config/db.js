import mongoose from "mongoose";

// db connection start

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("database connected successfully......");
	} catch (error) {
		console.log(error);
		throw new error("db connection failed!!!")
	}
};

// db connection end

export default connectDB;
