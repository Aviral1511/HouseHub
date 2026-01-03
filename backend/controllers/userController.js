import User from "../models/User.js";
import Booking from "../models/Booking.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const bookings = await Booking.find({ userId: req.user.id })
      .populate("providerId serviceId");

    res.json({ user, bookings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, address, phone, profilePic } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, address, phone, profilePic },
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProviderProfile = async (req, res) => {
  try {
    const { bio, experience, hourlyRate, profilePic } = req.body;

    const provider = await Provider.findOneAndUpdate(
      { userId: req.user.id },
      { bio, experience, hourlyRate, profilePic },
      { new: true }
    );

    res.json({ message: "Provider profile updated", provider });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

