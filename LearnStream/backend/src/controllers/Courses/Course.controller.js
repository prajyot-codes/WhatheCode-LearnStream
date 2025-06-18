import mongoose from "mongoose";
import { Assignments, Courses, Lectures } from "../../models/Course/courses.js";
// import { UserTeacher } from "../../models/student/userteachermodel.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { deleteMediaFromCloudinary, uploadMultipleFilesOnCloudinary, uploadOnCloudinary } from "../../utils/cloudinary.js";
import { UserStudent } from "../../models/user/userstudentmodel.js";
import { Progress } from "../../models/Course/Progress.js";
import { UserTeacher } from "../../models/user/userteachermodel.js";

const createCourse = asyncHandler(async (req,res)=> {
    // thumbnail upload using multer and cloudinary
    // save the rest of the data and link the author 
    const { title,description,price,category,isLive } = req.body;

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
        isLive: isLive,
    })

    const teacher = await UserTeacher.findByIdAndUpdate(req.teacher._id,{
        $push:{Courses:course._id}
    },
    {new:true});

    if (!course){
        throw new ApiError(400,"something went wrong while creating course")
    }

    if (!teacher){
        throw new ApiError(400,'Error while adding reference to teacher')
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,course,"created course succesfully")
    )
})
const getCourseByStudentId = asyncHandler(async (req,res)=>{
    const student_id  = req.student._id;
    console.log(req.params)
    if (!student_id){
        throw new ApiError('user is not logged in  or is undefined')
    }
    const studentcourses = await UserStudent.findById(student_id, { Courses: 1 })
  .populate({
    path: 'Courses',
    select: 'thumbnail title description price category author',
    populate: {
      path: 'author',
      select: 'name' // Populate only the author's name
    }
  });
    console.log(studentcourses);
    if (!studentcourses){
        throw new ApiError('student doesnt have any courses')
    }

    return res.status(200).json(
        new ApiResponse(200,studentcourses,'studentcourses succesfully sent ')
    )

})
const getCourseByTeacherId = asyncHandler(async(req,res)=>{
    const teacher_id  = req.teacher._id;

    if (!teacher_id){
        throw new ApiError('user is not logged in  or is undefined')
    }
    const teachercourses = await UserTeacher.findById(teacher_id, { Courses: 1 })
  .populate({
    path: 'Courses',
    select: 'thumbnail title description price category author',
    populate: {
      path: 'author',
      select: 'name' 
    }
  });
    console.log(teachercourses);
    if (!teachercourses){
        throw new ApiError('teacher doesnt have any courses')
    }

    return res.status(200).json(
        new ApiResponse(200,teachercourses,'teachercourses succesfully sent ')
    )

})
const getCourseById = asyncHandler(async (req, res)=> {
    const {courseId}  = req.params

    const course = await Courses.findById(courseId).populate('author', 'name');


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
    console.log(category)
    const courses = await Courses.find({ category }).select('thumbnail title author modules price ');
    const updatedCourses = await Promise.all(
        courses.map(async (course) => {
            const author = await UserTeacher.findById(course.author).select('name');
            return {
                ...course._doc, // Spread course data (MongoDB documents have `_doc` for raw data)
                author: author, // Add author details
            };
        })
    );
    console.log(updatedCourses)
    return res.status(200).json(new ApiResponse(200, updatedCourses, 'Courses fetched successfully'));
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
   
    
    console.log('req.student:', req.student);
    console.log('courseid',course_id)
    console.log('student_id:', student_id);

    if (!student_id) {
        throw new ApiError(401, 'User not authenticated');
    }

    const studenttobeEnrolled =await UserStudent.findById(student_id);
    const courseTobeEnrolled = await Courses.findById(course_id);
    if (!studenttobeEnrolled){
        throw new ApiError('course id not found')
    }
    if (!courseTobeEnrolled){
        throw new ApiError('student not found')
    }
    
    const alreadyEnrolled = studenttobeEnrolled.Courses.includes(course_id);

    if (alreadyEnrolled){
        return res.status(200).json( 
            new ApiResponse(200,alreadyEnrolled,'Student Already enrolled')
        )
    }

    const updatedCourse = await Courses.findByIdAndUpdate(course_id,
        {$push:{enrolledStudents:student_id}},{new:true}
    )

    const updatedStudent = await UserStudent.findByIdAndUpdate(student_id,
        {$push:{Courses:course_id}},{new:true}
    )

    if (!updatedCourse || !updatedStudent){
        throw new ApiError(404,"Failed To Enroll Student")
    }``
    
    return res.status(200).json(
        new ApiResponse(200,true,
            "student succesfully enrolled"
        )
    )
    
})
const checkEnrollment = asyncHandler(async(req,res)=>{
    const { courseId:course_id}  = req.params

    const student_id = req.student._id
   
    
    console.log('req.student:', req.student);
    console.log('courseid',course_id)
    console.log('student_id:', student_id);

    if (!student_id) {
        throw new ApiError(401, 'User not authenticated');
    }

    const studenttobeEnrolled =await UserStudent.findById(student_id);
    const courseTobeEnrolled = await Courses.findById(course_id);
    if (!studenttobeEnrolled){
        throw new ApiError('course id not found')
    }
    if (!courseTobeEnrolled){
        throw new ApiError('student not found')
    }
    
    const alreadyEnrolled = studenttobeEnrolled.Courses.includes(course_id);

    return res.status(200).json( 
        new ApiResponse(200,alreadyEnrolled,'Student Already enrolled')
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
const CourseProgress = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const studentId = req?.student?._id;

    if (!courseId) {
        throw new ApiError("The course sent doesn't exist or is undefined");
    }

    // Fetch progress for the student in the given course
    const progress = await Progress.findOne({ courseId, studentId }).select('completedLectures completedLectureCount completedAssignments');

    if (!progress) {
        return res.status(200).json(new ApiResponse(200, 0, "No progress found, returning 0%"));
    }

    // Fetch total lectures and assignments in the course
    const course = await Courses.findById(courseId).select('lectures assignments');

    if (!course || (!course.lectures && !course.assignments)) {
        throw new ApiError("Encountered an error while fetching course details");
    }

    const totalLectures = course?.lectures.length || 0;
    const totalAssignments = course?.assignments.length || 0;

    // Calculate progress percentage based on completed lectures
    const progressPercentage = totalLectures > 0 ? (progress.completedLectureCount / totalLectures) * 100 : 0;

    // Get the completed lectures and assignments counts from the progress
    const completedLecturesCount = progress.completedLectures.length;
    const completedAssignmentsCount = progress.completedAssignments.length;

    return res.status(200).json(new ApiResponse(200, {
        progressPercentage,
        completedLecturesCount,
        completedAssignmentsCount,
        totalLectures,
        totalAssignments
    }, "Progress data sent successfully"));
});

const getCourseOwner = asyncHandler(async (req, res) => {
  const { courseId } = req.body;

  if (!courseId) {
    throw new ApiError(400, "courseId not found");
  }

  const owner = await Courses.findById(courseId).select("author");

  if (!owner) {
    throw new ApiError(404, "Course not found");
  }

  return res.status(200).json(
    new ApiResponse(200, owner, "Owner fetched successfully")
  );
});


export {
    createCourse,
    getCoursesByCategory,
    getAllCourses,
    getCourseById,
    getCourseByStudentId,
    CourseProgress,
    getEnrolledStudents,
    enrollStudent,
    checkEnrollment,
    getCourseByTeacherId,
    getCourseOwner
}
