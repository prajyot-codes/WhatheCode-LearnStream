import {Router} from "express"
import { loginUserStudent, logoutUserStudent, refreshAccessToken, registerUserStudent } from "../controllers/userstudentController.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWTStudent } from "../middleware/authstudent.middleware.js";
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
    registerUserStudent)
router.route('/login').post(loginUserStudent)
// secured route
router.route('/logout').post(verifyJWTStudent,logoutUserStudent)
router.route('/refresh-Token').post(verifyJWTStudent,refreshAccessToken)
export default router