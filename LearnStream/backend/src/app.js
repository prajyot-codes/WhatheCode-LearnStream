import dotenv from "dotenv";
dotenv.config(); // 👈 load environment variables before anything else

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()



//middleware
app.use(express.json({limit:"16kb"}))

const allowedOrigins = process.env.CORS_ORIGIN.split(",").map(origin => origin.trim());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


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
import PaymentRouter from "./routes/payment.routes.js"
// Routes declaration
app.use('/user/teacher',userTeacherRouter);
app.use('/user/student',userStudentRouter);
app.use('/courses',CourseRouter);
app.use('/auth',AuthRouter);
app.use('/payment',PaymentRouter);

export {app} 