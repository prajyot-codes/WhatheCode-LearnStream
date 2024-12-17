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
    if (Courses.findOne({title:title})){
        throw new ApiError(400,"Course Already exists")
    }

    if (!req.user){
        throw new ApiError(401,'User is not logged in')
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
const addLecturestoCourse = asyncHandler(async (req,res)=>{
    const {title,course_title} = req.body
    
    const course_id = await Courses.findOne({title:course_title}).select('_id') 

    if (title=="" ){
        throw new ApiError(400,"Title is required")
    }

    // Validate course existence
    if (!course_id) {
        throw new ApiError(404, "Course not found");
    }

    const videoLocalPath = req.file?.path

    if (!videoLocalPath){
        throw new ApiError(400,"file not uploaded")
    }

    const video = await uploadOnCloudinary(videoLocalPath)
    const videoUrl = video.secure_url
    if (!videoUrl){
        throw new ApiError(400,"video was not uploaded properly to cloudinary")
    }

    const video_public_id = video.public_id
    const video_duration = video.duration

    const lecture = await Lectures.create({
        title,
        videourl:videoUrl,
        duration:video_duration,
        public_id:video_public_id,
        course_id
    })


    return res.status(200).json(
        new ApiResponse(200,lecture,'added lecture succesfully')
    )
}) 
const getAllcreatedCourses = asyncHandler(async (req,res) =>{

}) 
export {
    createCourse,
    addLecturestoCourse,
    getAllcreatedCourses,
}