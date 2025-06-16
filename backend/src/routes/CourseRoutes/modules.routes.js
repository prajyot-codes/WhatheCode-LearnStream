import {Router} from 'express'

import { verifyJWT } from "../../middleware/authteacher.middleware.js";
import { upload } from "../../middleware/multer.middleware.js";
import { verifyJWTStudent } from "../../middleware/authstudent.middleware.js";
import { verifyJWTCombined } from "../../middleware/authcombined.middleware.js";
import { addModule, deleteModule, getCourseModules, getModuleById, updateModule } from '../../controllers/Courses/Modules.controller.js';
const router = Router()
// Modules
router.route('/:course_id/modules')
    .post(verifyJWT, addModule) // Create a new module
    .get(getCourseModules); // Get all modules for a course

router.route('/:courseId/modules/:module_id')
    .get(verifyJWTCombined, getModuleById) // Get a specific module
    .put(verifyJWT, updateModule) // Update a module
    .delete(verifyJWT, deleteModule); // Delete a module
export default router