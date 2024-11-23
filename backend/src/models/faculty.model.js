import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FacultySchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    collegeEmail: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    departmentId: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },

    position: {
        type: String,
        enum: ["Professor", "Associate Professor", "Assistant Professor", "Lecturer"],
        required: true
    },

}, { timestamps: true });

export const Faculty = mongoose.model("Faculty", FacultySchema);