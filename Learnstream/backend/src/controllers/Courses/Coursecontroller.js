import { Assignments, Courses, Lectures } from "../../models/Course/courses.js";
// import { UserTeacher } from "../../models/student/userteachermodel.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";


const createCourse = asyncHandler(async (req,res)=> {
    // thumbnail upload using multer and cloudinary
    // save the rest of the data and link the author 
    const { title,description,price,category } = req.body;

    if (!title || !description || !price || !req.user || !category){
        throw new ApiError(400,'Basic info about the course required')
    }

    if (!req.user){
        throw new ApiError(400,'User is not logged in')
    }
    
    const thumbnailLocalPath = req.file?.path;
    
    if (!thumbnailLocalPath){
        throw new ApiError(401,"thumbnail file is required")
    }

    const thumbnailUrl = await uploadOnCloudinary(thumbnailLocalPath);
    const thumbnailUrlString =thumbnailUrl.secure_url;

    if (!thumbnailUrlString)throw new ApiError(400,'thumbnail must be there')
        

    const course = await Courses.create({
        thumbnail:thumbnailUrlString,
        title ,
        description,
        price,
        author:req.user._id,
        category,
    })

    if (!course){
        throw new ApiError(401,"something went wrong while creating course")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,course,"created course succesfully")
    )
})

const getAllcreatedCourses = asyncHandler(async (req,res) =>{
     
}) 
export {
    createCourse
}