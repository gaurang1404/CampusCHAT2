import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SemesterSchema = new Schema({
    departmentId: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    
    number: {
        type: Number,
        min: 1,
        max: 8,
        required: true
    },

    year: {
        type: String,
        required: true
    },

    sections: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Section'
        }
    ],

    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],


}, {timestamps: true});

SemesterSchema.pre('remove', async function(next) {
    try {
        // Remove all sections associated with this semester
        await Section.deleteMany({ semesterId: this._id });
        next();
    } catch (error) {
        next(error);
    }
});


export const Semester = mongoose.model("Semester", SemesterSchema);