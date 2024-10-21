import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CourseSchema = new Schema({  
    semesterId: {
        type: Schema.Types.ObjectId,
        ref: "Semester",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true
    },

    credits: {
        type: String,
        required: true
    }

}, {timestamps: true});

export const Course = mongoose.model('Course', CourseSchema);
