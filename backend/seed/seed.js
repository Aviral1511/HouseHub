import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Service from "../models/Service.js";

dotenv.config();
await connectDB();

const defaultServices = [
    "Plumber", "Electrician", "Cleaner",
    "Carpenter", "AC Repair", "Painter"
];

const seed = async () => {
    try {
        for (let s of defaultServices) {
            const exists = await Service.findOne({ name: s });
            if (!exists) await Service.create({ name: s });
        }
        console.log("🌱 Default services inserted");
    } catch (err) {
        console.log("❌ Seed Error:", err);
    }
    process.exit();
};

seed();
