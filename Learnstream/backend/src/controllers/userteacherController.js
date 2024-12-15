import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js'
import { UserTeacher } from '../models/student/userteachermodel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
// const User = require('../models/student/userteachermodel');

const registerUser = asyncHandler( async (req,res,next) =>{
    // 1 get user details from frontend
    // 2 validation - not empty
    // 3 check if user already exists: username, email
    // 4 check for images, check for avatar
    // 5 upload them to cloudinary, avatar
    // 6 create user object - create entry in db
    // 7 remove password and refresh token field from response
    // 8 check for user creation
    // 9 return res
     
    // 1 for form or json
    const { name, email, password } = req.body
    console.log("email:",email);

    // 2 check
    if ([name,email,password].some((field)=>
    field?.trim() === "")){
        throw new ApiError(400,"all fields are required")
    }
    

    // 3 existence
    const existedUser =await UserTeacher.findOne({
        $or: [{ email },{ name }]
    })
    // console.log(existedUser);
    if (existedUser){
        throw new ApiError(409,"User with email or username already exits");
    }


    // 4 here we first get the path from multer 
    // that is the stored image files in multer 
    // since when the router first runs we run the multer middleware 
    // and upload the images onto multer 
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath){
        throw new ApiError(400,"avatar file is required")
    }
    if (!avatarLocalPath){
        throw new ApiError(400,"avatar file is required")
    }

})



// const jwt =  require('jsonwebtoken')
// const createToken = (_id)=>{
//     return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'});
// }
// const signupTeacher = async (req,res)=>{
//     const {name,email,password}  = req.body;
//     try {
//         const user = User.signup(name,email,password);
//         const token = createToken(user.id);
//         res.status(200).json({name,email,token})
//     } catch (error) {
//         res.status(400).json({error:error.message})   
//     }

// } 
// const loginTeacher = async (req,res)=>{
//     const {email,password} = req.body;
//     try {
//         const user  = await User.login(email,password);
//         const token = createToken(user._id);
//         const name = user.name;
//         res.status(200).json({name,email,token})
//     } catch (error) {
//         res.status(400).json({error : error.message})        
//     }
// }
export {registerUser}