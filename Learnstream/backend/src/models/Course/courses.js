import { UserStudent } from "../student/userstudentmodel";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
import mongoose,{Schema} from mongoose
const courseSchema =new Schema({
        
        videofile:{
            type:String, //cloudinary usrl
            required:true
        },
        thumbnail:{
            type:String,
            required:true
        },
        title:{
            type:String, 
            required:true
        },
        description:{
            type:String, //cloudinary usrl
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        author:{
            type:Schema.Types.ObjectId,
            ref:"UserTeacher"
        },
        category:{
            type:string,
            required:true,   
        },
        rating:{
            type:Number,
            default:0
        },
        students:[{
            type:Schema.Types.ObjectId,
            ref:"UserStudent"
        }

        ],
        lectures:[{
            type:Schema.Types.ObjectId,
            ref:"Lectures"
        }]
    },
    {
        timestamps:true
    }
)

const Lectures = new Schema({

     course_id:{
        type:Schema.Types.ObjectId,
        ref:Courses
     },
     title:{
        type:String,
        required:true
     },
     videourl:{
        type:String,
        required:true
     },
     completed:{
        type:Boolean,
        required:true,
        default:false
     },
     duration:{
        type:Number,
        required : true
    }
    },
    {
        timestamps:true
    })


export const Courses = mongoose.model("Courses",courseSchema);