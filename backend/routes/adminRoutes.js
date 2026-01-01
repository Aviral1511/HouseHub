import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";
import { getUsers, getProviders, approveProvider, getAllBookings, getAllReviews } 
from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", auth, allowRoles("admin"), getUsers);
router.get("/providers", auth, allowRoles("admin"), getProviders);
router.put("/provider/approve/:id", auth, allowRoles("admin"), approveProvider);
router.get("/bookings", auth, allowRoles("admin"), getAllBookings);
router.get("/reviews", auth, allowRoles("admin"), getAllReviews);

export default router;
