import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serviceCategory: { type: String, required: true },
    experience: Number,
    bio: String,
    basePrice: Number,
    documents: [String], // Govt ID/verification
    location: {
        city: String,
        state: String,
        pincode: String,
        coordinates: { type: [Number], index: "2dsphere" } // [lat,lng]
    },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    jobsCompleted: { type: Number, default: 0 },
    availability: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Provider", providerSchema);
