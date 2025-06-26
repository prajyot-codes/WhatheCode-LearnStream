import Razorpay from "razorpay"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Order } from "../models/Orders.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import crypto from "crypto";
const instance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

const createOrder = asyncHandler(async (req, res) => {
  const user_id = req.student._id;

  // --- 1. Validate input ----------------------------------------
  let { course_id, amount, currency = "INR" } = req.body;
    console.log("Raw body:", req.body);


  if (!course_id || !amount)
    throw new ApiError(400, "course_id and amount are required");

  // Razorpay needs smallest currency unit (paise)
  if (typeof amount === "string") amount = parseInt(amount, 10);
  amount = amount * 100; // ₹500 → 50000 paise

  const receipt = `rcpt-${Date.now()}`; // always < 40 chars

  // --- 2. Build options -----------------------------------------
  const options = {
    amount,
    currency,
    receipt: receipt, // good practice
    notes: { course_id, user_id },
  };

  // --- 3. Call Razorpay safely ----------------------------------
  let order;
  try {
    order = await instance.orders.create(options);
    console.log("Razorpay order created ⇒", order);
  } catch (err) {
    console.error("Razorpay error ⇒", err);         // SEE REAL MESSAGE
    throw new ApiError(400, err.error?.description || "Razorpay rejected request");
  }

  // --- 4. Persist in Mongo --------------------------------------
  await Order.create({
    course_id: course_id, // ✅ matches your schema
    user_id: req.student._id, // ✅ matches your schema
    razorpayOrder_id: order.id, // ✅ matches your schema
    amount,
    currency,
    status: "created"
});

  // --- 5. Respond ------------------------------------------------
  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order created successfully"));
});

const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new ApiError(400, "Missing required Razorpay parameters");
  }

  // ✅ Step 1: Create expected signature
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  // ✅ Step 2: Compare with actual signature
  if (expectedSignature !== razorpay_signature) {
    throw new ApiError(400, "Invalid signature");
  }

  // ✅ Step 3: Update order in DB
  const order = await Order.findOneAndUpdate(
    { razorpayOrder_id: razorpay_order_id },
    {
      status: "paid",
      razorpayPayment_id: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    },
    { new: true }
  );

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Payment verified and order updated"));
});



export {
    createOrder,verifyPayment
}