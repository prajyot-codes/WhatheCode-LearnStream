import mongoose from "mongoose";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Cart } from "../../models/cart.model.js";

const getCart = asyncHandler(async (req, res) => {
    const student_id = req.student._id;

    if (!student_id) {
        throw new ApiError(404, "Student Id not found");
    }

    const cart = await Cart.findOne({ user: student_id }).populate("items.course");

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    return res.status(200).json(
        new ApiResponse(200, cart, "Cart fetched successfully")
    );
});

const addToCart = asyncHandler(async (req, res) => {
  const studentId = req.student._id;
  const { courseId } = req.params;
  if(!studentId){
    throw new ApiError(401,"student not found");
  }

  if (!courseId) {
    throw new ApiError(400, "Course ID is required");
  }

  let cart = await Cart.findOne({ user: studentId });

  // If cart doesn't exist, create one
  if (!cart) {
    cart = await Cart.create({
      user: studentId,
      items: [{ course: courseId }],
    });
  } else {
    const alreadyInCart = cart.items.some(item => item.course.toString() === courseId);
    if (alreadyInCart) {
      throw new ApiError(409, "Course already in cart");
    }

    cart.items.push({ course: courseId });
    await cart.save();
  }

  return res.status(200).json(new ApiResponse(200, cart, "Course added to cart"));
});

const removeFromCart = asyncHandler(async (req, res) => {
    const student_id = req.student._id;
    const courseId = req.params.courseId;

    if (!courseId) {
        throw new ApiError(400, "Course ID is required");
    }

    const cart = await Cart.findOne({ user: student_id });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    const updatedItems = cart.items.filter(item => item.course.toString() !== courseId);

    cart.items = updatedItems;
    await cart.save();

    return res.status(200).json(
        new ApiResponse(200, cart, "Course removed from cart")
    );
});

const inCart=asyncHandler(async (req,res)=>{
  const student_id = req.student._id;
  const {courseId}=req.params;

  if(!courseId){
    throw new ApiError(404,"course not found");
  }
  
  const cart = await Cart.findOne({ user: student_id });

  if(!cart){
    throw new ApiError(404,"cart not found");
  }

  const courseExists = cart.items.some(item => item.course.toString() === courseId);

  return res.status(200).json(
    new ApiResponse(200, { inCart: courseExists },"course presence checked")
  )
})

export { getCart ,addToCart,removeFromCart,inCart};
