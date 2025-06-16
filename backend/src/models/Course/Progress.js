import mongoose,{Schema} from "mongoose";
const completedLectureSchema = new Schema({
    lectureId: {
        type: Schema.Types.ObjectId,
        ref: 'Lectures',
        required: true
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
});
const completedAssignmentSchema = new Schema({
    assignmentId:{
        type:Schema.Types.ObjectId,
        ref:'Assignments',
        required:true
    },
    completedAt:{
        type:Date,
        default:Date.now()
    }
})
const ProgressSchema = new Schema({
    studentId:{
        type:Schema.Types.ObjectId,
        ref:'UserStudent'
    },
    courseId:{
            type:Schema.Types.ObjectId,
        ref:'Courses'
    },
    completedLectures:[completedLectureSchema],
    completedAssignments:[completedAssignmentSchema],
    completedLectureCount: {
        type: Number,
        default: 0 
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
},{
    timestamps:true
})

const Progress = mongoose.model('Progress',ProgressSchema);

export {Progress}