import { Router } from "express";
import { 
    addLecture, 
    createCourse, 
    deleteLecture, 
    enrollStudent, 
    getAllCourses, 
    getAllLectures, 
    getEnrolledStudents, 
    getLecturebyId, 
    updateLecture } from "../controllers/Courses/Coursecontroller.js";

import { verifyJWT } from "../middleware/authteacher.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWTStudent } from "../middleware/authstudent.middleware.js";

const router = Router();


// Courses
router.route('/').post(verifyJWT,upload.single('thumbnail'),createCourse)
router.route('/').get(verifyJWT,upload.single('thumbnail'),getAllCourses)
// router.route('/:courseId').get( verifyJWT, getCourseById);
// router.route('/:courseId').put( verifyJWT, updateCourse);
// router.route('/:courseId').delete( verifyJWT, deleteCourse);
router.route('/:courseId/enroll').post( verifyJWTStudent, enrollStudent);
router.route('/:courseId/students').get( verifyJWT, getEnrolledStudents);

// Lectures
router.route('/:course_id/lectures').post(verifyJWT,upload.single('videourl'),addLecture)
router.route('/courses/:courseId/lectures/:lecture_id').put(verifyJWT, updateLecture);
router.route('/:course_id/lectures/:lecture_id').delete( verifyJWT, deleteLecture);
router.route('/:course_id/lectures').get(getAllLectures)
router.route('/:course_id/lectures/:lecture_id').get( verifyJWT,getLecturebyId);

// router.route('/:course_id/free-previews').get( verifyJWT, getFreePreviews);lecture_






export default router