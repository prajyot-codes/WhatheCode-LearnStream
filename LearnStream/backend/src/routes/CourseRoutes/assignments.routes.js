import { Router } from 'express';


import { upload } from '../../middleware/multer.middleware.js';
import { verifyJWT } from "../../middleware/authteacher.middleware.js";
import { verifyJWTStudent } from "../../middleware/authstudent.middleware.js";
import { verifyJWTCombined } from "../../middleware/authcombined.middleware.js";
import { uploadAssignment } from '../../controllers/Courses/Assignment.controller.js';

const router = Router()

// Assignments
router.route('/:course_id/assignment').post(verifyJWT,upload.fields([
    {name:'assignmentFiles',maxCount:10}
]),uploadAssignment);

export default router;