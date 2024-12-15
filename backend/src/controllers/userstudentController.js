import {asyncHandler} from '../utils/asyncHandler.js'
// const User = require('../models/student/userstudentmodel');



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
//         const name =user.name;
//         res.status(200).json({name,email,token})
//     } catch (error) {
//         res.status(400).json({error : error.message})        
//     }
// }
module.exports = {loginStudent,signupStudent}