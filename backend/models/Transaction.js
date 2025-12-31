import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Provider", required: true },
    amount: Number,
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    paymentMethod: String
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
