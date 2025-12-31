import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: "HouseHub" });
        console.log("📦 MongoDB Connected");
    } catch (err) {
        console.error("❌ DB Connection Error: ", err.message);
        process.exit(1);
    }
};

export default connectDB;
