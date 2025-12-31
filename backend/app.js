import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import providerRoutes from "./routes/providerRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";


const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());


const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
});


app.use("/api/auth", authRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/services", serviceRoutes);


const PORT = process.env.PORT;

server.listen(PORT, async () => {
    await connectDB();
    console.log(`🚀 Server running on port ${PORT}`);
});
