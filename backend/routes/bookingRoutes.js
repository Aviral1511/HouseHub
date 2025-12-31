import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";
import { createBooking, acceptBooking, completeBooking, getMyBookings, getProviderBookings } from "../controllers/bookingController.js";

const router = express.Router();

// User creates new booking
router.post("/create", auth, allowRoles("user"), createBooking);

// Provider accepts job
router.put("/accept/:id", auth, allowRoles("provider"), acceptBooking);

// Provider marks work completed
router.put("/complete/:id", auth, allowRoles("provider"), completeBooking);

// User's bookings
router.get("/my", auth, allowRoles("user"), getMyBookings);

// Provider's bookings
router.get("/provider", auth, allowRoles("provider"), getProviderBookings);

export default router;
