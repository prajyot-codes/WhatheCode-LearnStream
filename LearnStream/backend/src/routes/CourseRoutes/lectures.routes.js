import {Router} from 'express'

import { verifyJWT } from "../../middleware/authteacher.middleware.js";
import { upload } from "../../middleware/multer.middleware.js";
import { verifyJWTStudent } from "../../middleware/authstudent.middleware.js";
import { verifyJWTCombined } from "../../middleware/authcombined.middleware.js";
import { addLecture,
         deleteLecture,
         getAllLectures,
         getLecturebyId,
         markLectureCompleted 
    } from "../../controllers/Courses/Lecture.controller.js";

const router = Router()

// Lectures
router.route('/:course_id/lectures').post(verifyJWT,upload.single('videourl'),addLecture)
router.route('/:course_id/lectures/:lecture_id').delete( verifyJWT, deleteLecture);
router.route('/:course_id/lectures').get(getAllLectures)
router.route('/:courseId/lectures/:lectureId/complete').post(verifyJWTStudent,markLectureCompleted);//
router.route('/:course_id/lectures/:lecture_id').get( verifyJWTCombined,getLecturebyId);

export default router