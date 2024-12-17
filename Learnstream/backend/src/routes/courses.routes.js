import { Router } from "express";
import { addLecturestoCourse, createCourse } from "../controllers/Courses/Coursecontroller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route('/add-course').post(verifyJWT,upload.single('thumbnail'),createCourse)
router.route('/lectures/add').post(upload.single('videourl'),addLecturestoCourse)
export default router