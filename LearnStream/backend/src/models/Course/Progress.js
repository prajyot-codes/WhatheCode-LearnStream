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