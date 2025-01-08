import mongoose from "mongoose";
import { Assignments, Courses, Lectures } from "../../models/Course/courses.js";
// import { UserTeacher } from "../../models/student/userteachermodel.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { deleteMediaFromCloudinary, uploadMultipleFilesOnCloudinary, uploadOnCloudinary } from "../../utils/cloudinary.js";
// import { UserStudent } from "../../models/student/userstudentmodel.js";

// assignments

const createAssignment = asyncHandler(async (req,res)=>{
    const {title,deadline} = req?.body
    const {course_id} = req?.params;
    if ((!course_id || !title )){
        throw new ApiError('CourseId and Title cannot be empty')
    }
    const assignmentFiles = req.files?.assignmentFiles;

    if (!assignmentFiles || assignmentFiles.length==0) throw new ApiError('no assignments uploaded');
    
    console.log(assignmentFiles)
    
    const filePaths = assignmentFiles.map((file)=>file.path)
    const uploadedFiles = await uploadMultipleFilesOnCloudinary(filePaths);

    const fileUrls  = uploadedFiles.map((file)=>file.secure_url)
    const public_ids = uploadedFiles.map((file)=>file.public_id) 

    const assignment = await Assignments.create({
        course_id,
        title,
        public_id:public_ids,
        assignmentUrls:fileUrls,
        deadline,
    })

    const assignmentObject = await Assignments.findById(assignment?._id).select('_id public_id deadline')
    console.log(assignmentObject)
    return res.status(200).json(
        new ApiResponse(200,assignmentObject,'assignment Succesfully Created')
    )
})   
const submitAssignment = asyncHandler(async (req,res)=>{
    const {assignmentId} = req?.params;
    const {studentId,deadline} = req.body;
    if(!studentId ||!assignmentId ||!deadline){
        throw ApiError(404,'assignmentId || studentId ||deadline are missing')
    }

    const submittedOnTime = Date.now()<deadline?true:false;

    const submissionFiles = req.files?.submissionFiles;

    if (!submissionFiles || submissionFiles.length==0) throw new ApiError('no assignments uploaded');
    
    console.log(submissionFiles)
    
    const filePaths = submissionFiles.map((file)=>file.path)
    const uploadedFiles = await uploadMultipleFilesOnCloudinary(filePaths);

    const fileUrls  = uploadedFiles.map((file)=>file.secure_url)
    // const public_ids = uploadedFiles.map((file)=>file.public_id)

    const submittedAssignment = await Assignments.findByIdAndUpdate(assignmentId,
        {
            $push:{uploadedAssignments:{
                studentId,
                submittedAssignmentUrls:fileUrls,
                uploadedAt:Date.now(),
                submittedOnTime
            }}
        },
    {new:true})

    res.status(200).json(
        new ApiResponse(200,{},'submittedAssignment Succesfully')
    )
})
export {
    createAssignment,
    submitAssignment,
}