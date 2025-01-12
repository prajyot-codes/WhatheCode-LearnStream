import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiError } from '../../utils/ApiError.js'
import { UserStudent } from '../../models/student/userstudentmodel.js';
import { uploadOnCloudinary } from '../../utils/cloudinary.js';
import { ApiResponse  } from '../../utils/ApiResponse.js'
import  jwt  from 'jsonwebtoken';
// const User = require('../models/student/userstudentmodel');

const generateAccessAndRefreshTokens  = async (userId)=>{
    try {
        const userStudent = await UserStudent.findById(userId)
        const accessToken = userStudent.generateAccessToken();
        const refreshToken = userStudent.generateRefreshToken();

        userStudent.refreshToken = refreshToken;
        await userStudent.save({ validateBeforeSave:false })

        return {accessToken , refreshToken}


    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating Refresh And Access tokens")
    }
}
const registerUserStudent = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    if ([name, email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }
  
    const existedUser = await UserStudent.findOne({
      $or: [{ email }, { name }]
    });
  
    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists");
    }
    console.log('helo')
    const userStudent = await UserStudent.create({ name, email, password });
    console.log('helo')
  
    // Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(userStudent._id);
    console.log("1")
    console.log("Cookies set: ", accessToken, refreshToken);
    // Send the response with accessToken and userId
    const createdStudent = await UserStudent.findById(userStudent._id).select("-password -refreshToken");
  
    if (!createdStudent) {
      throw new ApiError(500, "Something went wrong while registering the user");
    }
  
    const options = {
        httpOnly:true,
        secure:true
    }


    return res.status(200)
    .cookie("studentAccessToken" ,accessToken,options)
    .cookie("studentRefreshToken" ,refreshToken,options)
    .json(
        new ApiResponse(200,{
            user: createdStudent,role:'student',accessToken,refreshToken
        },
        "User Logged in Succesfully"
    )
    )
  });
  

const loginUserStudent = asyncHandler(async (req,res)=>{
    // get email and password from the user
    // compare it with the email and password in the database
    // generate an access token and a refresh token 
    // give back as response to the user(send cookie)
    console.log(req.body)
    const {email,password} = req.body;
    if (!email || !password){
        throw new ApiError(400,"email or password is required")
    }

    // User Object
    const userStudent =await UserStudent.findOne({email});

    if (!userStudent){
        throw new ApiError(404,'no such user exists')
    }
    
    // basically our created userStudent variable can use the created passwords else
    // like this
    // if (!UserStudent.findById(userStudent._id ).isPasswordCorrect(password)){
    //     throw new ApiError(400,'incorrect password')
    // }

    const isPasswordValid = await userStudent.isPasswordCorrect(password)
    if (!isPasswordValid){
        throw new ApiError(401,'Invalid User Credentials')
    }
    // generate acces token
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(userStudent._id)

    const LoggedInUserStudent = await UserStudent.findById(userStudent._id).select("-password -refreshToken")
    
    const options = {
        httpOnly:true,
        secure:true
    }

    console.log("Cookies set: ", accessToken, refreshToken);

    return res.status(200)
    .cookie("studentAccessToken" ,accessToken,options)
    .cookie("studentRefreshToken" ,refreshToken,options)
    .json(
        new ApiResponse(200,{
            user: LoggedInUserStudent,role:'student',accessToken,refreshToken
        },
        "User Logged in Succesfully"
    )
    )
})

const logoutUserStudent = asyncHandler(async (req,res)=>{
    await UserStudent.findByIdAndUpdate(
        req.student._id,
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
    .clearCookie("studentAccessToken",options)
    .clearCookie("studentRefreshToken",options)
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
    
        const user =  await UserStudent.findById(decodedToken?._id)
    
        if (!user){
            throw new ApiError(401,"invalid token")
        }
    
        if (user?.refreshToken !== incomingrefreshToken){
            throw new ApiError(401,"refresh token is expired or used")
        }
    
        const {accessToken,newRefreshToken} = await generateAccessAndRefreshTokens(user._id);
        
        return res.
        status(200)
        .cookie("studentAccessToken",accessToken,options)
        .cookie("studentRefreshToken",newRefreshToken,options)
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
    registerUserStudent,
    loginUserStudent,
    logoutUserStudent,
    refreshAccessToken,
}