import { Router } from "express";
import { verifyJWTStudent } from "../middleware/authstudent.middleware.js";
import { createOrder, verifyPayment } from "../controllers/Payment.controller.js";

const router = Router();

router.post('/create-order',verifyJWTStudent,createOrder);
router.post('/verify',verifyJWTStudent,verifyPayment);

export default router