import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    basePrice: { type: Number, default: 200 },
    description: String
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
