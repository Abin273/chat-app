import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: true,
		},
		message: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
