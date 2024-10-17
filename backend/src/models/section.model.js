import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SectionSchema = new Schema({
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
        course: { 
            type: Schema.Types.ObjectId, 
            ref: 'Course',
            required: true
        },

        faculty: { 
            type: Schema.Types.ObjectId, 
            ref: 'Faculty',
            required: true 
        }
    }]
}, {timestamps: true});

export const Section = mongoose.model("Section", SectionSchema);