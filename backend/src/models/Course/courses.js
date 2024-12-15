import { UserStudent } from "../student/userstudentmodel";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
import mongoose,{Schema} from mongoose
const courseSchema =new Schema({
        
        videofile:{
            type:String, //cloudinary usrl
            required:true
        },
        thumbnail:{

        },
        title:{
            type:String, 
            required:true
        },
        description:{
            type:String, //cloudinary usrl
            required:true
        },
        duration:{
            type:Number,
            required : true
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

        ]
    },
    {
        timestamps:true
    }
)
export const Courses = mongoose.model("Courses",courseSchema);