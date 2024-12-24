import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { UserTeacher } from "../models/student/userteachermodel.js" 
const verifyJWT = asyncHandler(async (req,res,next)=>{
   try {
     const token = req.cookies?.accessToken || req.header
     ("Authorization")?.replace("Bearer","")
 
     if (!token){
         throw new ApiError(401,"Unauthorized Request")
     }
 
     const decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
     const user = await UserTeacher.findById(decodedtoken?._id).select(
         "-password -refreshToken")
     
     if (!user){
         // Next discusssion front end
         throw new ApiError(401,"Invalid Access Token")
     }
     req.user = user
     console.log('Teacher user set in req:', req.user);
     next();
   } catch (error) {
    throw new ApiError(401,error?.message || 
        "Invalid Access Token"
    )
   }
})

export {verifyJWT}