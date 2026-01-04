import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Provider from "../models/Provider.js";
import cloudinary from "../config/cloudinary.js";

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
    const { name, phone, address } = req.body;

    let updateData = {
      name,
      phone,
      address: address ? JSON.parse(address) : undefined,
    };

    // 🔥 OPTIONAL image upload (like chat)
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "househub_profiles" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      updateData.profilePic = uploadResult.secure_url;
    }

    // Remove undefined fields
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const updateProviderProfile = async (req, res) => {
  try {
    const { bio, experience, hourlyRate } = req.body;

    let updateData = {
      bio,
      experience,
      hourlyRate,
    };

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "househub_providers" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      updateData.profilePic = uploadResult.secure_url;
    }

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const provider = await Provider.findOneAndUpdate(
      { userId: req.user.id },
      updateData,
      { new: true }
    );

    res.json({ message: "Provider profile updated", provider });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

