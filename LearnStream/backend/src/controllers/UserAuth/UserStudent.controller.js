import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiError } from '../../utils/ApiError.js'
import { UserStudent } from '../../models/user/userstudentmodel.js';
import { uploadOnCloudinary } from '../../utils/cloudinary.js';
import { ApiResponse  } from '../../utils/ApiResponse.js'
import  jwt  from 'jsonwebtoken';
import { maxHeaderSize } from 'http';
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

const registerUserStudent = asyncHandler( async (req,res) =>{
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
    console.log(req.body);
    const { name, email, password } = req.body
    console.log("email:",email);
    // console log req .body

    // 2 check
    if ([name,email,password].some((field)=>
    field?.trim() === "")){
        throw new ApiError(400,"all fields are required")
    }
    

    // 3 existence
    const existedUser =await UserStudent.findOne({
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
    // const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    // // also console log req .files

    // if (!avatarLocalPath){
    //     throw new ApiError(400,"avatar file is required")
    // }
   
    // const avatar = await uploadOnCloudinary(avatarLocalPath)
    // const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    // if (!avatar){
    //     throw new ApiError(400,"Avatar is required")
    // }
    // 6
    const userStudent = await UserStudent.create({
        name,
        email,
        password
    })
    // 7
    
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(userStudent._id)
    
    const createdStudent =await UserStudent.findById(userStudent._id).select(
        "-password -refreshToken"
    )
    
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    };

    console.log("Cookies set: ", accessToken, refreshToken);

    return res.status(200)
    .cookie("studentAccessToken" ,accessToken,options)
    .cookie("studentRefreshToken" ,refreshToken,options)
    .json(
        new ApiResponse(200,{
            user: createdStudent,
            role:'student',
            accessToken,
            refreshToken
        },
        "User Logged in Succesfully"
    )
    )
    // // 8 
    // if (!createdStudent){
    //     throw new ApiError(500,"something went wrong while registering the user")
    // }
    // // 9
    // console.log("sending response")
    // return res.status(201).json(
    //     new ApiResponse(201,createdStudent,"User Registered Succesfully")
    // )

})

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
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
    };

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

const logoutUserStudent = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.studentRefreshToken;

    if (!refreshToken) {
        throw new ApiError(400, "No refresh token found");
    }

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    await UserStudent.findByIdAndUpdate(decoded._id, {
        $set: { refreshToken: undefined },
    });

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 0, // instantly expire
    };

    return res
        .status(200)
        .clearCookie("studentAccessToken", options)
        .clearCookie("studentRefreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});




export {
    registerUserStudent,
    loginUserStudent,
    logoutUserStudent,
    generateAccessAndRefreshTokens,
}