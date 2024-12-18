import { Router } from "express";
import { 
    addLecture, 
    createCourse, 
    deleteLecture, 
    getAllCourses, 
    getAllLectures, 
    getLecturebyId, 
    updateLecture } from "../controllers/Courses/Coursecontroller.js";

    import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

// courses


router.route('/').post(verifyJWT,upload.single('thumbnail'),createCourse)
router.route('/').get(verifyJWT,upload.single('thumbnail'),getAllCourses)
// router.route('/:courseId').get( verifyJWT, getCourseById);
// router.route('/:courseId').put( verifyJWT, updateCourse);
// router.route('/:courseId').delete( verifyJWT, deleteCourse);
// router.route('/:courseId/enroll').post( verifyJWT, enrollStudent);
// router.route('/:courseId/students').get( verifyJWT, getEnrolledStudents);


router.route('/:course_id/lectures').post(verifyJWT,upload.single('videourl'),addLecture)

router.route('/courses/:courseId/lectures/:id').put(verifyJWT, updateLecture);

router.route('/:course_id/lectures/:id').delete( verifyJWT, deleteLecture);

router.route('/:course_id/lectures').get(verifyJWT,getAllLectures)

router.route('/:course_id/lectures/:id').get( verifyJWT,getLecturebyId);

// router.route('/:course_id/free-previews').get( verifyJWT, getFreePreviews);






export default router