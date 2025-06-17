
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()



//middleware
app.use(express.json({limit:"16kb"}))
app.use(cors({
    origin:'https://learnstream.onrender.com' || process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next();
})


//Routers
// import userStudentRouter from './routes/studentsauth'
import userTeacherRouter from './routes/teachers.routes.js'
import userStudentRouter from './routes/students.routes.js'
import CourseRouter from './routes/CourseRoutes/index.routes.js'
import AuthRouter from "./routes/auth.routes.js"
// Routes declaration
app.use('/user/teacher',userTeacherRouter);
app.use('/user/student',userStudentRouter);
app.use('/courses',CourseRouter);
app.use('/auth',AuthRouter);

export {app} 