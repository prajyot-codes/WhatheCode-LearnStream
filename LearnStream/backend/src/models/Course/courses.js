
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
import mongoose,{Schema} from 'mongoose'
const courseSchema =new Schema({
        
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
            ref:"UserTeacher",
            required:true
        },
        category:{
            type:String,
            required:true,   
        },
        rating:{
            type:Number,
            default:0
        },
        enrolledStudents:[{
            type:Schema.Types.ObjectId,
            ref:"UserStudent"
        }],
        lectures:[{
            type:Schema.Types.ObjectId,
            ref:"Lectures"
        }],
        assignments:[{
            type:Schema.Types.ObjectId,
            ref:"Assignments"
        }]
    },
    {
        timestamps:true
    }
)

const lectureSchema = new Schema({

     title:{
        type:String,
        required:true
     },
     videourl:{
        type:String, //cloudinary url
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
    },
    public_id:{
        type:String,
        required:true
    },
    freePreview:{
        type:Boolean,
        default:false
    },
    course_id:{
        type:Schema.Types.ObjectId,
        ref:'Courses'
    }
    },
    {
        timestamps:true
})

const assignmentSchema = new Schema({
    course_id:{
        type : String
    },
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        default:'',
    },
    grading:{
        type:Number,
    },
    deadline:{
        type:Date,
        required:false,
    },
    uploadedAssignments: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserStudent', // Assuming you have a Student model
            required: true,
        },
        assignmentUrl: {
            type: String,
            required: true,
        },
        uploadedAt: {
            type: Date,
            default: Date.now,
        }
    }],
    checked: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserStudent', // Assuming you have a Student model
            required: true,
        },
        isChecked: {
            type: Boolean,
            default: false,
        }
    }],
},{
    timestamps:true
})

courseSchema.pre('remove', async function (next) {
    await Lectures.deleteMany({ _id: { $in: this.lectures } });
    next();
});


const Courses = mongoose.model("Courses",courseSchema);
const Lectures = mongoose.model("Lectures",lectureSchema);
const Assignments = mongoose.model("Assignments",assignmentSchema);
export {
    Courses,
    Lectures,
    Assignments
}