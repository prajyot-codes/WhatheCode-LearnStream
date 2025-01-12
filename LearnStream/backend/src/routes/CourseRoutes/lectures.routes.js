import {Router} from 'express'

import { verifyJWT } from "../../middleware/authteacher.middleware.js";
import { upload } from "../../middleware/multer.middleware.js";
import { verifyJWTStudent } from "../../middleware/authstudent.middleware.js";
import { verifyJWTCombined } from "../../middleware/authcombined.middleware.js";
import { addLecture, deleteLecture, getAllLectures, getLectureById, markLectureCompleted, updateLecture } from '../../controllers/Courses/Lecture.controller.js';


const router = Router()

// Lectures
// Lectures
router.route('/:course_id/modules/:moduleId/lectures')
    .post(verifyJWT, upload.single('videourl'),addLecture ) // Add a lecture to a module
    .get(verifyJWTCombined, getAllLectures); // Get all lectures for a module

router.route('/:course_id/modules/:moduleId/lectures/:lecture_id')
    .get(verifyJWTCombined, getLectureById) // Get a specific lecture
    .delete(verifyJWT, deleteLecture) // Delete a lecture
    .put(verifyJWT,updateLecture)//update a lecture

router.route('/:courseId/lectures/:lectureId/complete')
    .post(verifyJWTStudent, markLectureCompleted); // Mark lecture as completed

export default router