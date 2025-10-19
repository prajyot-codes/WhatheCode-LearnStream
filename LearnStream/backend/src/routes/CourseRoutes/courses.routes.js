import { Router } from "express";
import { 
    checkEnrollment,
    CourseProgress, 
    createCourse, 
    enrollMultipleCourses, 
    getAllCourses, 
    getCourseById, 
    getCourseByStudentId, 
    getCourseByTeacherId, 
    getCourseOwner, 
    getCoursesByCategory, 
    getEnrolledStudents, 
 } from "../../controllers/Courses/Course.controller.js";

import { verifyJWT } from "../../middleware/authteacher.middleware.js";
import { upload } from "../../middleware/multer.middleware.js";
import { verifyJWTStudent } from "../../middleware/authstudent.middleware.js";
import { verifyJWTCombined } from "../../middleware/authcombined.middleware.js";
import { addToCart, getCart, inCart, removeFromCart } from "../../controllers/Courses/cart.controller.js";
const router = Router();

//  Cart Routes
router.route('/cart').get(verifyJWTStudent, getCart);
router.route('/cart/:courseId')
      .post(verifyJWTStudent, addToCart)
      .delete(verifyJWTStudent, removeFromCart)
      .get(verifyJWTStudent, inCart);

//  Static Routes FIRST
router.route('/getallCourses').get(getAllCourses);
router.route('/student/:student_id').get(verifyJWTStudent, getCourseByStudentId);
router.route('/teacher/:teacher_id').get(verifyJWT, getCourseByTeacherId);
router.route('/').get(getCoursesByCategory); // category filter
router.route('/').post(verifyJWT, upload.single('thumbnail'), createCourse);

//  Dynamic Routes NEXT (Keep These At Bottom)
router.route('/:courseId/getTeacher').get(getCourseOwner);
router.route('/enroll').post(verifyJWTStudent, enrollMultipleCourses);
router.route('/:courseId/enrolled').get(verifyJWTCombined, checkEnrollment);
router.route('/:courseId/progress').get(verifyJWTCombined, CourseProgress);
router.route('/:courseId/students').get(verifyJWT, getEnrolledStudents);
router.route('/:courseId').get(getCourseById); // LAST


// Course Cart 

// Assignments
// router.route('/:course_id/free-previews').get( verifyJWT, getFreePreviews);lecture_

export default router