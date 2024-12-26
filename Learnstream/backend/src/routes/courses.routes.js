import { Router } from "express";
import { 
    addLecture, 
    CourseProgress, 
    createCourse, 
    deleteLecture, 
    enrollStudent, 
    getAllCourses, 
    getAllLectures, 
    getCourseById, 
    getCoursesByCategory, 
    getEnrolledStudents, 
    getLecturebyId, 
    markLectureCompleted, 
    updateLecture } from "../controllers/Courses/Coursecontroller.js";

import { verifyJWT } from "../middleware/authteacher.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWTStudent } from "../middleware/authstudent.middleware.js";
import { verifyJWTCombined } from "../middleware/authcombined.middleware.js";

const router = Router();


// Courses
router.route('/').post(verifyJWT,upload.single('thumbnail'),createCourse)
router.route('/:courseId').get( verifyJWT, getCourseById);//
router.route('/:courseId/students').get( verifyJWT, getEnrolledStudents);//
router.route('/:courseId/enroll').post( verifyJWTStudent, enrollStudent);
router.route('/courses').get(verifyJWTCombined,getCoursesByCategory)
router.route('/').get(verifyJWTCombined,getAllCourses)// i still have doubts regarding this feature and plan to remove it 
router.route('/:courseId/progress').get(verifyJWTCombined, CourseProgress)//
// router.route('/:courseId').put( verifyJWT, updateCourse);
// router.route('/:courseId').delete( verifyJWT, deleteCourse);

// Lectures
router.route('/:course_id/lectures').post(verifyJWT,upload.single('videourl'),addLecture)
router.route('/:course_id/lectures/:lecture_id').delete( verifyJWT, deleteLecture);
// router.route('/:courseId/lectures/:lecture_id').put(verifyJWT, updateLecture);
router.route('/:course_id/lectures').get(getAllLectures)
router.route('/:courseId/lectures/:lectureId/complete').post(verifyJWTStudent,markLectureCompleted);//
router.route('/:course_id/lectures/:lecture_id').get( verifyJWTCombined,getLecturebyId);
// router.route('/:course_id/free-previews').get( verifyJWT, getFreePreviews);lecture_






export default router