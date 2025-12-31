import Booking from "../models/Booking.js";
import Provider from "../models/Provider.js";


// USER creates booking request
export const createBooking = async (req, res) => {
    try {
        const { providerId, serviceId, scheduledDate, address, totalAmount } = req.body;

        const newBooking = await Booking.create({
            userId: req.user.id,
            providerId,
            serviceId,
            scheduledDate,
            address,
            totalAmount,
            status: "pending"
        });

        res.json({ message: "Booking created", booking: newBooking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// PROVIDER accepts booking
export const acceptBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) return res.status(404).json({ message: "Booking not found" });
        if (booking.providerId.toString() !== req.user.id)
            return res.status(403).json({ message: "Unauthorized" });

        booking.status = "accepted";
        await booking.save();

        res.json({ message: "Booking accepted", booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// PROVIDER marks as completed
export const completeBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) return res.status(404).json({ message: "Booking not found" });
        if (booking.providerId.toString() !== req.user.id)
            return res.status(403).json({ message: "Unauthorized" });

        booking.status = "completed";
        booking.paymentStatus = "pending"; // later updated after payment
        await booking.save();

        res.json({ message: "Booking completed", booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// USER views their bookings
export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id })
            .populate("providerId serviceId");

        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// PROVIDER views assigned bookings
export const getProviderBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ providerId: req.user.id })
            .populate("userId serviceId");

        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
