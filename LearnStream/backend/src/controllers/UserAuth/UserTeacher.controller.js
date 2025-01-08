import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiError } from '../../utils/ApiError.js'
import { UserTeacher } from '../../models/student/userteachermodel.js';
import { uploadOnCloudinary } from '../../utils/cloudinary.js';
import { ApiResponse  } from '../../utils/ApiResponse.js'
import  jwt  from 'jsonwebtoken';
// const User = require('../models/student/userteachermodel');

const generateAccessAndRefreshTokens  = async (userId)=>{
    try {
        const userTeacher = await UserTeacher.findById(userId)
        const accessToken = userTeacher.generateAccessToken();
        const refreshToken = userTeacher.generateRefreshToken();

        userTeacher.refreshToken = refreshToken;
        await userTeacher.save({ validateBeforeSave:false })

        return {accessToken , refreshToken}


    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating Refresh And Access tokens")
    }
}

const registerUser = asyncHandler( async (req,res) =>{
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

    // console log req .body

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

    // also console log req .files

    if (!avatarLocalPath){
        throw new ApiError(400,"avatar file is required")
    }
   
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    // console.log(avatar)

    if (!avatar){
        throw new ApiError(400,"Avatar is required")
    }
    // 6
    const userTeacher = await UserTeacher.create({
        name,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password
    })
    // 7
    const createdTeacher =await UserTeacher.findById(userTeacher._id).select(
        "-password -refreshToken"
    )
    // 8 
    if (!createdTeacher){
        throw new ApiError(500,"something went wrong while registering the user")
    }
    // 9
    console.log("sending response")
    return res.status(201).json(
        new ApiResponse(201,createdTeacher,"User Registered Succesfully")
    )

})
const loginUser = asyncHandler(async (req,res)=>{
    // get email and password from the user
    // compare it with the email and password in the database
    // generate an access token and a refresh token 
    // give back as response to the user(send cookie)

    const {email,password} = req.body;
    if (!email || !password){
        throw new ApiError(400,"email or password is required")
    }

    // User Object
    const userTeacher =await UserTeacher.findOne({email});

    if (!userTeacher){
        throw new ApiError(404,'no such user exists')
    }
    
    // basically our created userTeacher variable can use the created passwords else
    // like this
    // if (!UserTeacher.findById(userTeacher._id ).isPasswordCorrect(password)){
    //     throw new ApiError(400,'incorrect password')
    // }

    const isPasswordValid = await userTeacher.isPasswordCorrect(password)
    if (!isPasswordValid){
        throw new ApiError(401,'Invalid User Credentials')
    }
    // generate acces token
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(userTeacher._id)

    const LoggedInUserTeacher = await UserTeacher.findById(userTeacher._id).select("-password -refreshToken")
    
    const options = {
        httpOnly:true,
        secure:true
    }

    console.log("Cookies set: ", accessToken, refreshToken);

    return res.status(200)
    .cookie("teacherAccessToken" ,accessToken,options)
    .cookie("teacherRefreshToken" ,refreshToken,options)
    .json(
        new ApiResponse(200,{
            user: LoggedInUserTeacher,role:'teacher',accessToken,refreshToken
        },
        "User Logged in Succesfully"
    )
    )
})

const logoutUser = asyncHandler(async (req,res)=>{
    await UserTeacher.findByIdAndUpdate(
        req.teacher._id,
        {
            $set:{
                refreshToken:undefined
            }
            
        },{
            new:true
        }
    )
    // there is something wrong with cookie clearing part have to resolve later

    const options ={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("teacherAccessToken",options)
    .clearCookie("teacherRefreshToken",options)
    .json(new ApiResponse(200,{},"user logged out"));
})

const refreshAccessToken= asyncHandler(async (req,res)=>{
    try {
        const incomingrefreshToken = req.cookie?.refreshToken || req.body.refreshToken
        
        if (!incomingrefreshToken){
            throw new ApiError(401,"incoming refresh token is invalid")
        }
        const options = {
            httpOnly:true,
            secure:true
        }
        const decodedToken = jwt.verify(incomingrefreshToken,process.env.REFRESH_TOKEN_SECRET)
    
        const user =  await UserTeacher.findById(decodedToken?._id)
    
        if (!user){
            throw new ApiError(401,"invalid token")
        }
    
        if (user?.refreshToken !== incomingrefreshToken){
            throw new ApiError(401,"refresh token is expired or used")
        }
    
        const {accessToken,newRefreshToken} =await generateAccessAndRefreshTokens(user._id);
        
        return res.
        status(200)
        .cookie("teacherAccessToken",accessToken,options)
        .cookie("teacherRefreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(200,
                {accessToken,refreshToken:newRefreshToken},
            "access token refreshed")
        )
    } catch (error) {
         throw new ApiError(400,error?.message  || "invalid refresh token")
    }
})



export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}