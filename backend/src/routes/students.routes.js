import {Router} from "express"
import { loginUserStudent, logoutUserStudent, refreshAccessToken, registerUserStudent } from "../controllers/UserAuth/UserStudent.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWTStudent } from "../middleware/authstudent.middleware.js";
const router =Router();

router.route('/signup').post(registerUserStudent)
router.route('/login').post(loginUserStudent)
// secured route
router.route('/logout').post(verifyJWTStudent,logoutUserStudent)
router.route('/refresh-Token').post(verifyJWTStudent,refreshAccessToken)
export default router