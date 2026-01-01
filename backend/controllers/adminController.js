import User from "../models/User.js";
import Provider from "../models/Provider.js";
import Booking from "../models/Booking.js";
import Review from "../models/Review.js";

// Get all users
export const getUsers = async (req,res)=>{
  const users = await User.find().select("-password");
  res.json(users);
};

// Get all providers (pending or active)
export const getProviders = async (req,res)=>{
  const providers = await Provider.find().populate("userId","name email");
  res.json(providers);
};

// Approve provider (optional & upgrade)
export const approveProvider = async (req,res)=>{
  const { id } = req.params;
  await Provider.findByIdAndUpdate(id,{ approved:true });
  res.json({ message:"Provider approved" });
};

// Get all bookings
export const getAllBookings = async (req,res)=>{
  const bookings = await Booking.find()
    .populate("userId providerId serviceId");
  res.json(bookings);
};

// Get all reviews
export const getAllReviews = async (req,res)=>{
  const reviews = await Review.find()
    .populate("userId","name")
    .populate("providerId","serviceCategory");
  res.json(reviews);
};
