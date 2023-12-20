import { ChatRoom } from "../models/room";


export const getChatsByRoomId = async(req,res)=>{
    const {roomId} = req.params;
    const chats = await chatModel.find()
    res.status(200).json({ "chats": chats});

}