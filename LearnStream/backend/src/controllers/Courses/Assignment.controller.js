import mongoose from "mongoose";
import { Assignments, Courses, Lectures } from "../../models/Course/courses.js";
// import { UserTeacher } from "../../models/student/userteachermodel.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { deleteMediaFromCloudinary, uploadMultipleFilesOnCloudinary, uploadOnCloudinary } from "../../utils/cloudinary.js";
import { Modules } from "../../models/Course/Modules.js";
// import { UserStudent } from "../../models/student/userstudentmodel.js";

// assignments

// const createAssignment = asyncHandler(async (req,res)=>{
//     const {title,deadline} = req?.body
//     const {course_id,moduleId} = req?.params;
//     if ((!course_id || !title ||!moduleId)){
//         throw new ApiError('CourseId and Title cannot be empty')
//     }
//     const assignmentFiles = req.files?.assignmentFiles;

//     if (!assignmentFiles || assignmentFiles.length==0) throw new ApiError('no assignments uploaded');
    
//     console.log(assignmentFiles)
    
//     const filePaths = assignmentFiles.map((file)=>file.path)
//     const uploadedFiles = await uploadMultipleFilesOnCloudinary(filePaths);

//     const fileUrls  = uploadedFiles.map((file)=>file.secure_url)
//     const public_ids = uploadedFiles.map((file)=>file.public_id) 

//     const assignment = await Assignments.create({
//         course_id,
//         module_id:moduleId,
//         title,
//         public_id:public_ids,
//         assignmentUrls:fileUrls,
//         deadline,
//     })

//     const assignmentObject = await Assignments.findById(assignment?._id).select('_id public_id deadline')
//     console.log(assignmentObject)
//     return res.status(200).json(
//         new ApiResponse(200,assignmentObject,'assignment Succesfully Created')
//     )
// }) 
import fs from "fs/promises"; // Use fs.promises for async operations

const createAssignment = asyncHandler(async (req, res) => {
    const { title, deadline } = req.body;
    const { course_id, moduleId } = req.params;

    // ✅ Validate required fields
    if (!course_id || !title || !moduleId) {
        throw new ApiError('CourseId, Title, and ModuleId cannot be empty');
    }

    // ✅ Check for uploaded files
    const assignmentFiles = req.files?.assignmentFiles;
    if (!assignmentFiles || assignmentFiles.length === 0) {
        throw new ApiError('No assignments uploaded');
    }

    // ✅ Check if an assignment already exists in the module
    const existingAssignment = await Assignments.findOne({ course_id, module_id: moduleId, title });
    if (existingAssignment) {
        throw new ApiError('Assignment with the same title already exists for this module.');
    }

    // ✅ Upload files to Cloudinary
    const filePaths = assignmentFiles.map((file) => file.path);
    let uploadedFiles;
    try {
        uploadedFiles = await uploadMultipleFilesOnCloudinary(filePaths);
    } catch (error) {
        throw new ApiError('Error uploading files to Cloudinary. Please try again.');
    }

    const fileUrls = uploadedFiles.map((file) => file.secure_url);
    const public_ids = uploadedFiles.map((file) => file.public_id);

    const parsedDeadline = deadline && !isNaN(new Date(deadline)) ? new Date(deadline) : null;

    const assignment = await Assignments.create({
        course_id,
        module_id: moduleId,
        title,
        public_id: public_ids,
        assignmentUrls: fileUrls,
        deadline: parsedDeadline,
    });

    const updatedModule = await Modules.findByIdAndUpdate(
        moduleId,
        { $push: { assignments: assignment._id } }, // Push assignment ID into the module
        { new: true }
    ).populate("assignments"); // ✅ Populate assignments to confirm the update

    if (!updatedModule) {
        throw new ApiError(404, "Module not found, assignment not linked.");
    }

    for (const path of filePaths) {
        try {
            await fs.unlink(path);
        } catch (error) {
            console.error(`Error deleting file ${path}:`, error);
        }
    }

    const assignmentObject = await Assignments.findById(assignment._id).select('_id public_id deadline title');

    return res.status(200).json(
        new ApiResponse(200, assignmentObject, 'Assignment successfully created and linked to the module')
    );
});



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
const getAssignmentById = asyncHandler(async (req, res)=>{
    const {assignmentId} = req?.params;

    if (!assignmentId){
        throw new ApiError(404,'AssignmentId not sent')
    }

    const assignment = await Assignments.findById(assignmentId).select('-module_id -assignmentUrls')

    if (!assignment){
        throw new ApiError(404,'The Assignment Requested was not found');
    }
    res.status(200).json(
        new ApiResponse(200,assignment,'Assignment sent succesfully')
    )
}) 
const deleteAssignment = asyncHandler(async (req,res)=>{
    const {moduleId,courseId,assignmentId} = req.params

    const course = await  Courses.findById(courseId)
    const assignment = await Assignments.findById(assignmentId)
    const module = await Modules.findById(moduleId)
    
    if (!course){
        throw new ApiError(404,"Course Not Found")
    }
    if (!assignment){
        throw new ApiError(404,"Lecture Not Found")
    }
    if (!module){
        throw new ApiError(404,"Lecture Not Found")
    }
    
    assignment.public_id.forEach(async (id)=>{
        await deleteMediaFromCloudinary(id);
    })

    //delete from courses array 
    course.assignments = course.assignments.filter(assignment_id =>!assignment_id
        .equals(assignment._id))
    await course.save();
    
    module.assignments = module.assignments.filter(
        (id) => !id.equals(assignment._id)
    );
    await module.save();
    
    await Assignments.findByIdAndDelete(assignmentId);
    
    return res.status(200)
    .json(new ApiResponse(200,null,"Assignment deleted succesfully"))
})
const getStudentsAndUploadedAssignments = asyncHandler(async (req, res) => {
    const { assignmentId } = req.params;  // Corrected to access params directly

    // Find the assignment by assignmentId
    const assignment = await Assignment.findById(assignmentId)
        .populate({
            path: 'uploadedAssignments.studentId', // Populate student details
            select: 'name email', // You can add other student fields as needed
        });

    // If the assignment doesn't exist, return an error
    if (!assignment) {
        res.status(404);
        throw new ApiError( 404,'Assignment not found');
    }

    // Send the response with assignment data and students who uploaded
    res.status(200).json(
        new ApiResponse(200,{
            assignmentTitle: assignment.title,
            uploadedAssignments: assignment.uploadedAssignments.map((submission) => ({
                studentId: submission.studentId._id,
                studentName: submission.studentId.name,
                studentEmail: submission.studentId.email,
                submittedAssignmentUrls: submission.submittedAssignmentUrls,
                uploadedAt: submission.uploadedAt,
            })),
        },"Students and Their Assignments sent Succesfully")
    );
});
export {
    createAssignment,
    submitAssignment,
    deleteAssignment,
    getAssignmentById,
    getStudentsAndUploadedAssignments
}