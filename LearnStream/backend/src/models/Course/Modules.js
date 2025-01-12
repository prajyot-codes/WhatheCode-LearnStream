import mongoose from 'mongoose';
import { Assignments, Lectures } from './courses';
const { Schema } = mongoose;

const moduleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false // Optional module description
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Courses',
        required: true
    },
    lectures: [{
        type: Schema.Types.ObjectId,
        ref: 'Lectures'
    }],
    assignments: [{
        type: Schema.Types.ObjectId,
        ref: 'Assignments'
    }]
}, {
    timestamps: true
});
moduleSchema.pre('remove', async function (next) {
    try {
        // Delete all lectures associated with the module
        await Lectures.deleteMany({ module_id: this._id });

        // Delete all assignments associated with the module
        await Assignments.deleteMany({ module_id: this._id });

        next();
    } catch (error) {
        next(error);
    }
});

const Modules = mongoose.model('Modules', moduleSchema);

export { Modules };
