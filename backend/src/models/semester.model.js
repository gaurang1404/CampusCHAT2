import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SemesterSchema = new Schema({
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

    isCurrentSemester: {
        type: Boolean,
        default: true
    }

}, {timestamps: true});

export const Semester = mongoose.model("Semester", SemesterSchema);