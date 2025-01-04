import mongoose from "mongoose";
import { Assignments, Courses, Lectures } from "../../models/Course/courses.js";
// import { UserTeacher } from "../../models/student/userteachermodel.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { deleteMediaFromCloudinary, uploadOnCloudinary } from "../../utils/cloudinary.js";
import { UserStudent } from "../../models/student/userstudentmodel.js";
import { Progress } from "../../models/Course/Progress.js";

const createCourse = asyncHandler(async (req,res)=> {
    // thumbnail upload using multer and cloudinary
    // save the rest of the data and link the author 
    const { title,description,price,category } = req.body;

    if (!title || !description || !price || !req.teacher || !category){
        throw new ApiError(400,'Basic info about the course required')
    }
    const existingCourse = await Courses.findOne({ title: title });
    if (existingCourse) {
        throw new ApiError(400, "Course Already exists");
    }

    if (!req.teacher){
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
        author:req.teacher._id,
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

const getCourseById = asyncHandler(async (req, res)=> {
    const {courseId}  = req.params

    const course = await Courses.findById(courseId)

    if (!course){
        throw new ApiError("course not found")
    }

    return res.status(200).json(200,
        new ApiResponse(200,course,"course sent succesfully")
    )
 })

const getCoursesByCategory = asyncHandler(async (req, res) => {
    const { category } = req.query;

    if (!category) {
        throw new ApiError(400, 'Category is required');
    }

    const courses = await Courses.find({ category });
    res.status(200).json(new ApiResponse(200, courses, 'Courses fetched successfully'));
});

const getAllCourses = asyncHandler(async (req,res) =>{
    // to get all courses i will only send back basic details 
    // such as the course object containing lecture
    const courses = await Courses.find().
    select('thumbnail title description price category rating')
     
    if (!courses){
        throw new ApiError('There was Some Error Fetching Courses')
    }

    return res.status(200).json(
        new ApiResponse (200,courses, 'Courses Fetched Succesfully')
    )
})

const enrollStudent  = asyncHandler(async (req,res)=>{
    // get student data such as id,and payment data
    // check if the student exists
    // add student to courses.enrolledStudents Array.
    // add course to the given Students model 
    const { courseId:course_id}  = req.params

    const student_id = req.student._id
   
    
    // console.log('req.student:', req.student);
    // console.log('courseid',course_id)
    // console.log('student_id:', student_id);

    if (!student_id) {
        throw new ApiError(401, 'User not authenticated');
    }

    if (!(await Courses.findById(course_id))){
        throw new ApiError('course id not found')
    }
    if (!(await UserStudent.findById(student_id))){
        throw new ApiError('student not found')
    }
    
    const updatedCourse = await Courses.findByIdAndUpdate(course_id,
        {$push:{enrolledStudents:student_id}},{new:true}
    )

    const updatedStudent = await UserStudent.findByIdAndUpdate(student_id,
        {$push:{Courses:course_id}},{new:true}
    )

    if (!updatedCourse || !updatedStudent){
        throw new ApiError(404,"Failed To Enroll Student")
    }
    
    res.status(200).json(
        new ApiResponse(200,{},
            "student succesfully enrolled"
        )
    )
    
})
const getEnrolledStudents = asyncHandler(async (req,res)=>{
    const {courseId} = req.params
    
    const students = await Courses.findById(courseId).select('enrolledStudents')
    
    if (!students){
        throw new ApiError('Error while fetching students for course')
    }

    return res.status(200).json(
        new ApiResponse(200,students,"Succesfully Sent Student Data")
    )
})

const CourseProgress = asyncHandler(async(req,res)=>{
    const {courseId:course_id} = req.params
    const studentid = req?.student?._id
    const teacherid = req?.teacher?._id
    // console.log(course_id);
    // console.log(studentid)
    // console.log(teacherid)
    if (!course_id){
        throw new ApiError('The course sent doesnt exist or is undefined')
    }
    const completedLectures = await Progress.findOne({courseId:course_id,studentId:studentid}).select('completedLectureCount')
    console.log(completedLectures.completedLectureCount)
    
    if (!completedLectures){
        throw new ApiError('Encountered An error while fetching completed Lectures')
    }
    
    const course = await Courses.findById(course_id).select('lectures')
    const totalLectures = course.lectures.length
    console.log(totalLectures)
    if (!totalLectures){
        throw new ApiError('Encountered An error while fetching totalLectures')
    }
    const progress = (completedLectures.completedLectureCount/totalLectures)*100  
    return res.status(200)
    .json(new ApiResponse(200,progress,'progress data sent succesfully'))
})


// assignments

const uploadAssignment = asyncHandler(async (req,res)=>{
    const {course_id,title,deadline} = req?.body
    if (!(course_id || title )){
        throw new ApiError('CourseId and Title cannot be empty')
    }
    const AssignmentFiles = req.files?.assignmentFiles
}) 

export {
    createCourse,
    getCoursesByCategory,
    getAllCourses,
    getCourseById,
    CourseProgress,
    getEnrolledStudents,
    enrollStudent,
    uploadAssignment
}
