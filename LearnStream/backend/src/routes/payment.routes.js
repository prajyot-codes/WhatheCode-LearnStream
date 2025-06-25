import { Router } from "express";
import { verifyJWTStudent } from "../middleware/authstudent.middleware.js";
import { createOrder } from "../controllers/Payment.controller.js";

const router = Router();

router.post('/create-order',verifyJWTStudent,createOrder);

export default router