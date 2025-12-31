import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Provider", required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },

    status: {
        type: String,
        enum: ["pending", "accepted", "in_progress", "completed", "cancelled"],
        default: "pending"
    },
    scheduledDate: Date,
    address: String,
    totalAmount: Number,
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    chatRoomId: { type: String },
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
