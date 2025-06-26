// models/payment/orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  course_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }],
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserStudent", required: true },
  razorpayOrder_id: { type: String, required: true },
  razorpayPayment_id: { type: String },
  razorpaySignature: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
}, { timestamps: true });


export const Order = mongoose.model("Order", orderSchema);
