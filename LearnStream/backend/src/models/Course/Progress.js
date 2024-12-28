import mongoose,{Schema} from "mongoose";
const ProgressSchema = new Schema({
    studentId:{
        type:Schema.Types.ObjectId,
        ref:'UserStudent'
    },
    courseId:{
        type:Schema.Types.ObjectId,
        ref:'Courses'
    },
    completedLectures:[{
        type:Schema.Types.ObjectId,
        ref:'Lectures'
    }],
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

const Progress = mongoose.model('Progess',ProgressSchema);

export {Progress}