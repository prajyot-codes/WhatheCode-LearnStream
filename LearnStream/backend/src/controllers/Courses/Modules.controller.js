import mongoose from "mongoose";
import { Assignments, Courses, Lectures } from "../../models/Course/courses.js";
// import { UserTeacher } from "../../models/student/userteachermodel.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { deleteMediaFromCloudinary, uploadMultipleFilesOnCloudinary, uploadOnCloudinary } from "../../utils/cloudinary.js";
import { UserStudent } from "../../models/user/userstudentmodel.js";
import { Progress } from "../../models/Course/Progress.js";
import { Modules } from "../../models/Course/Modules.js";

const addModule = asyncHandler(async (req, res) => {
    const { course_id } = req.params;
    const { title, description } = req.body;

    if (!course_id || !title) {
        throw new ApiError(400, "Course ID and Module title are required");
    }

    const course = await Courses.findById(course_id);
    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    const newModule = await Modules.create({
        title,
        description,
        course: course_id
    });

    course.modules.push(newModule._id);
    await course.save();

    res.status(200).json(new ApiResponse(200, newModule, "Module added successfully"));
});
const addLectureToModule = asyncHandler(async (req, res) => {
    const { module_id } = req.params;
    const { title } = req.body;
    const videoLocalPath = req.file?.path;

    if (!module_id || !title || !videoLocalPath) {
        throw new ApiError(400, "Module ID, Lecture title, and video file are required");
    }

    const module = await Modules.findById(module_id);
    if (!module) {
        throw new ApiError(404, "Module not found");
    }

    const video = await uploadOnCloudinary(videoLocalPath);
    const lecture = await Lectures.create({
        title,
        videourl: video.secure_url,
        duration: video.duration,
        public_id: video.public_id,
        course_id: module.course
    });

    module.lectures.push(lecture._id);
    await module.save();

    res.status(200).json(new ApiResponse(200, lecture, "Lecture added to module successfully"));
});
const addAssignmentToModule = asyncHandler(async (req, res) => {
    const { module_id } = req.params;
    const { title, deadline } = req.body;

    if (!module_id || !title) {
        throw new ApiError(400, "Module ID and Assignment title are required");
    }

    const module = await Modules.findById(module_id);
    if (!module) {
        throw new ApiError(404, "Module not found");
    }

    const assignmentFiles = req.files?.assignmentFiles;
    if (!assignmentFiles || assignmentFiles.length === 0) {
        throw new ApiError(400, "No assignments uploaded");
    }

    const filePaths = assignmentFiles.map(file => file.path);
    const uploadedFiles = await uploadMultipleFilesOnCloudinary(filePaths);
    const fileUrls = uploadedFiles.map(file => file.secure_url);
    const public_ids = uploadedFiles.map(file => file.public_id);

    const assignment = await Assignments.create({
        course_id: module.course,
        title,
        assignmentUrls: fileUrls,
        public_id: public_ids,
        deadline
    });

    module.assignments.push(assignment._id);
    await module.save();

    res.status(200).json(new ApiResponse(200, assignment, "Assignment added to module successfully"));
});
const updateModule = asyncHandler(async (req, res) => {
    const { module_id } = req.params;
    const { title, description } = req.body;

    const module = await Modules.findById(module_id);
    if (!module) {
        throw new ApiError(404, "Module not found");
    }

    if (title) module.title = title;
    if (description) module.description = description;

    await module.save();

    return res.status(200).json(
        new ApiResponse(200, module, "Module updated successfully")
    );
});

const deleteModule = asyncHandler(async (req, res) => {
    const { module_id } = req.params;

    const module = await Modules.findById(module_id);
    if (!module) {
        throw new ApiError(404, "Module not found");
    }

    await module.deleteOne(); // Triggers the `pre` middleware for cleanup

    return res.status(200).json(
        new ApiResponse(200, null, "Module deleted successfully")
    );
});

const getCourseModules = asyncHandler(async (req, res) => {
    const { course_id } = req.params;
    console.log(course_id)
    const course = await Courses.findById(course_id).populate({
        path: 'modules',
        populate: [
            { path: 'lectures', select: 'title duration freePreview public_id' },
            { path: 'assignments', select: 'title deadline' }
        ]
    });
    console.log(course)
    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    res.status(200).json(new ApiResponse(200, course.modules, "Modules fetched successfully"));
});
const getModuleById = asyncHandler(async (req, res) => {
    const { module_id } = req.params;

    const module = await Modules.findById(module_id)
        .populate({
            path: "lectures",
            select: "_id title duration freePreview",
        })
        .populate({
            path: "assignments",
            select: "_id title deadline",
        });

    if (!module) {
        throw new ApiError(404, "Module not found");
    }

    return res.status(200).json(
        new ApiResponse(200, module, "Module retrieved successfully")
    );
});

export{
    getCourseModules,
    addAssignmentToModule,
    addLectureToModule,
    addModule,
    deleteModule,
    updateModule,
    getModuleById
}