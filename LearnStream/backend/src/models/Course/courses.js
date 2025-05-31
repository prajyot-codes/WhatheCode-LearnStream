
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
import mongoose,{Schema} from 'mongoose'
import { Modules } from './Modules.js';
const courseSchema =new Schema({
        
        thumbnail:{
            type:String,
            required:true
        },
        isLive:{
            type:Boolean,
            default:false,
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
        }],
        modules: [{
            type: Schema.Types.ObjectId,
            ref: 'Modules'
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
    },
    module_id: { // Links assignments to modules
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Modules',
        required: true,
    }
    },
    {
        timestamps:true
})
const assignmentSchema = new Schema({
    module_id: { // Links assignments to modules
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Modules',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    assignmentUrls: [ // URLs for assignment files
        {
            type: String, // Cloudinary or other storage URLs
            default: '',
        },
    ],
    public_id: [ // Cloudinary file IDs
        {
            type: String,
            default: '',
        },
    ],
    deadline: {
        required:false,
        type: Date,
        default: null,
    },
    uploadedAssignments: [
        {
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserStudent',
                required: true,
            },
            submittedAssignmentUrls: [
                {
                    type: String,
                    required: true,
                },
            ],
            uploadedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    checked: [
        {
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserStudent',
                required: true,
            },
            isChecked: {
                type: Boolean,
                default: false,
            },
            grading: {
                type: Number, // Grade assigned to the student
                default: null,
            },
            submittedOnTime: {
                type: Boolean, // Whether the submission was on time
                default: true,
            },
        },
    ],
}, { timestamps: true });

courseSchema.pre('remove', async function (next) {
    try {
        // Find all modules associated with the course
        const modules = await Modules.find({ course_id: this._id });

        // Iterate over modules and remove them (triggers Module's pre('remove') middleware)
        for (const module of modules) {
            await module.remove();
        }

        next();
    } catch (error) {
        next(error);
    }
});

const Courses = mongoose.model("Courses",courseSchema);
const Lectures = mongoose.model("Lectures",lectureSchema);
const Assignments = mongoose.model("Assignments",assignmentSchema);
export {
    Courses,
    Lectures,
    Assignments
}