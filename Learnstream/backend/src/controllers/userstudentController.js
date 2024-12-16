import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js'
import { UserStudent } from '../models/student/userstudentmodel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse  } from '../utils/ApiResponse.js'
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
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    // also console log req .files

    if (!avatarLocalPath){
        throw new ApiError(400,"avatar file is required")
    }
   
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar){
        throw new ApiError(400,"Avatar is required")
    }
    // 6
    const userStudent = await UserStudent.create({
        name,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password
    })
    // 7
    const createdStudent =await UserStudent.findById(userStudent._id).select(
        "-password -refreshToken"
    )
    // 8 
    if (!createdStudent){
        throw new ApiError(500,"something went wrong while registering the user")
    }
    // 9
    console.log("sending response")
    return res.status(201).json(
        new ApiResponse(201,createdStudent,"User Registered Succesfully")
    )

})

const loginUserStudent = asyncHandler(async (req,res)=>{
    // get email and password from the user
    // compare it with the email and password in the database
    // generate an access token and a refresh token 
    // give back as response to the user(send cookie)

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
    .cookie("accessToken" ,accessToken,options)
    .cookie("refreshToken" ,refreshToken,options)
    .json(
        new ApiResponse(200,{
            user: LoggedInUserStudent,accessToken,refreshToken
        },
        "User Logged in Succesfully"
    )
    )
})

const logoutUserStudent = asyncHandler(async (req,res)=>{
    await UserStudent.findByIdAndUpdate(
        req.user._id,
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
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
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
    
        const {accessToken,newRefreshToken} = generateAccessAndRefreshTokens(user._id);
        
        return res.
        status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(200,
                {accessToken,refreshToken:newRefreshToken},
            "access token refreshed")
        )
    } catch (error) {
         throw new ApiError(400,error?.message  || "invalid refresh token")
    }
})




// const jwt =  require('jsonwebtoken')
// const createToken = (_id)=>{
//     return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'});
// }
// const signupStudent = async (req,res)=>{
//     const {name,email,password}  = req.body;
//     try {
//         const user = User.signup(name,email,password);
//         const token = createToken(user.id);
//         res.status(200).json({name,email,token})
//     } catch (error) {
//         res.status(400).json({error:error.message})   
//     }

// } 
// const loginStudent = async (req,res)=>{
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
export {
    registerUserStudent,
    loginUserStudent,
    logoutUserStudent,
    refreshAccessToken,
}