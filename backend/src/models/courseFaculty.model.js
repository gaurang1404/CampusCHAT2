import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CourseFacultySchema = new Schema({
    semesterId: {
        type: Schema.Types.ObjectId,
        ref: "Semester",
        required: true
    },

    sectionId: {
        type: Schema.Types.ObjectId,
        ref: "Section",
        required: true
    },

    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },

    facultyId: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
    },  

}, {timestamps: true});

export const CourseFaculty = mongoose.model("CourseFaculty", CourseFacultySchema);