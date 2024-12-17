import { Router } from "express";
import { createCourse } from "../controllers/Courses/Coursecontroller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route('/course-creation').post(verifyJWT,upload.single('thumbnail'),createCourse)

export default router