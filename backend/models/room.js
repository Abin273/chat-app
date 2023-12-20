import mongoose, { Schema, model } from "mongoose";

const chatRoomSchema = new Schema(
	{
		users: {  // array of objectId
			type: [
				{
					type: mongoose.Types.ObjectId,
					ref: "user",
				},
			],
			require: true,
		},
		lastMessage: {
			type: String,
		},
		lastMessageTime: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export const ChatRoom = model("chatRoom", chatRoomSchema);
