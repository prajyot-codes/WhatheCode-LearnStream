import {Router} from "express"
import { loginUserStudent, logoutUserStudent, registerUserStudent } from "../controllers/userstudentController.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
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
router.route('/logout').post(verifyJWT,logoutUserStudent)

export default router