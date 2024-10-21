import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SectionSchema = new Schema({
    semesterId: {
        type: Schema.Types.ObjectId,
        ref: "Semester",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    students: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Student' 
        }
    ],

    courseFacultyMapping: [{
        courseId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Course',
            required: true
        },

        facultyId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Faculty',
            required: true 
        }
    }]
}, {timestamps: true});

export const Section = mongoose.model("Section", SectionSchema);