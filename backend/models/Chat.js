import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: String,
    image: String
}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);
