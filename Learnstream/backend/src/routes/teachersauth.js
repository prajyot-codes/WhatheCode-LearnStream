import {Router} from "express"
import {registerUser} from "../controllers/userteacherController.js"
import { upload } from "../middleware/multer.middleware.js";
const router =Router();

router.route('/signup').post(
    // injecting middle ware
    upload.fields([
        {
            name:"avatar", // front end field should also be avatar
            maxCount: 1
        },
        {
            name:"coverImage",
            maxCount: 1
        }
    ]),
    registerUser)
// router.post('/login',loginTeacher)

export default router