import Booking from "../models/Booking.js";
import Provider from "../models/Provider.js";
import Service from "../models/Service.js";


// USER creates booking request
export const createBooking = async (req, res) => {
    try {
        const { providerId, serviceId, scheduledDate, address, totalAmount } = req.body;

        // Ensure the selected date is not in the past
        const currentDate = new Date();
        const selectedDate = new Date(scheduledDate);

        if (selectedDate < currentDate) {
            return res.status(400).json({ message: "Scheduled date cannot be in the past. Please select a future date." });
        }

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
        console.log(err);
        res.status(500).json({ err });
    }
};



// PROVIDER accepts booking
export const acceptBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) return res.status(404).json({ message: "Booking not found" });
        console.log(booking);
        if (booking.providerId.toString() !== req.user.id)
            return res.status(403).json({ message: "Unauthorized" });

        booking.status = "accepted";
        await booking.save();

        res.json({ message: "Booking accepted", booking });
    } catch (err) {
        console.log(err);
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
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};


// USER views their bookings
// export const getMyBookings = async (req, res) => {
//     try {
//         const bookings = await Booking.find({ userId: req.user.id })
//         .populate({
//             path: "providerId",
//             // select: "-password",           // remove password if provider has one
//             populate: {
//             path: "userId",
//             // select: "-password"          // remove password from provider's user
//             }
//         })
//         .populate({
//             path: "serviceId"
//         });
//         console.log(bookings)
//         res.json(bookings);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: err.message });
//     }
// };

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("serviceId")

    // get all provider userIds from bookings
    const providerUserIds = bookings.map(b => b.providerId);

    // fetch providers whose userId matches booking.providerId
    const providers = await Provider.find({
      userId: { $in: providerUserIds }
    })
      .populate("userId", "-password")
    // console.log(providers);

    // map providers by userId
    const providerMap = {};
    providers.forEach(p => {
      providerMap[p.userId._id.toString()] = p;
    });

    // console.log(providerMap);

    // attach provider object manually
    const enrichedBookings = bookings.map(b => ({
      ...b.toObject(),
      provider: providerMap[b.providerId?.toString()] || null
    }));
    // console.log(enrichedBookings);
    res.json(enrichedBookings);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



// PROVIDER views assigned bookings
export const getProviderBookings = async (req, res) => {  
    try {
        const bookings = await Booking.find({ providerId: req.user.id })
        .populate("userId serviceId");
        
        // console.log(bookings);
        res.json(bookings);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// export const getProviderBookings = async (req, res) => {
//   try {
//     // 1️⃣ Find provider linked to logged-in user
//     const provider = await Provider.findOne({ userId: req.user.id });

//     if (!provider) {
//       return res.status(404).json({ message: "Provider profile not found" });
//     }

//     // 2️⃣ Fetch bookings for this provider
//     const bookings = await Booking.find({ providerId: provider._id })
//       .populate("userId", "-password")
//       .populate("serviceId");

//     res.json(bookings);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };
