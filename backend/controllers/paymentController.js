import { razorpay } from "../config/razorpay.js";
import CryptoJS from "crypto-js";
import Transaction from "../models/Transaction.js";
import Booking from "../models/Booking.js";

export const createOrder = async (req, res) => {
  try {
    const { amount, bookingId } = req.body;

    const options = {
      amount: amount * 100, // convert to paisa
      currency: "INR",
      receipt: `receipt_${bookingId}`
    };

    const order = await razorpay.orders.create(options);

    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId, amount } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    // Signature Validation
    const expectedSig = CryptoJS.HmacSHA256(body, process.env.RAZORPAY_KEY_SECRET).toString();

    if (expectedSig !== razorpay_signature)
      return res.status(400).json({ message: "Payment verification failed" });

    // Save Transaction
    await Transaction.create({
      bookingId,
      userId: req.user.id,
      providerId: req.body.providerId,
      amount,
      status: "success",
      paymentMethod: "Razorpay",
    });

    // Update Booking Status
    await Booking.findByIdAndUpdate(bookingId, { paymentStatus: "paid" });

    res.json({ message: "Payment verified successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

