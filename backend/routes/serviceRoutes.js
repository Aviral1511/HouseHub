import express from "express";
import { getAllServices, addService } from "../controllers/serviceController.js";
import { auth } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public - anyone can see list
router.get("/", getAllServices);

// Only admin can add new service category
router.post("/add", auth, allowRoles("admin"), addService);

export default router;
