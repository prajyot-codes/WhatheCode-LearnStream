import { Router } from 'express';


import { upload } from '../../middleware/multer.middleware.js';
import { verifyJWT } from "../../middleware/authteacher.middleware.js";
import { verifyJWTStudent } from "../../middleware/authstudent.middleware.js";
import { verifyJWTCombined } from "../../middleware/authcombined.middleware.js";
import { createAssignment, deleteAssignment, getAssignmentById, getStudentsAndUploadedAssignments, submitAssignment  } from '../../controllers/Courses/Assignment.controller.js';

const router = Router()

// Assignments
router.route('/:course_id/modules/:moduleId/assignments')
    .post(
        verifyJWT,
        upload.fields([{ name: 'assignmentFiles', maxCount: 10 }]),
        createAssignment
    ); // Create a new assignment for a module
router.route('/:courseId/modules/:moduleId/assignments/:assignmentId/upload')
    .post(
        verifyJWTStudent,
        upload.fields([{ name: 'submissionFiles', maxCount: 10 }]),
        submitAssignment
    ); // Submit an assignment

router.route('/:courseId/assignment/:assignmentId')
.get(verifyJWT,getStudentsAndUploadedAssignments)

router.route('/:courseId/modules/:moduleId/assignments/:assignmentId')
    .get(verifyJWTCombined, getAssignmentById) // Get assignment details
    .delete(verifyJWT, deleteAssignment); // Delete an assignment
export default router;