import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    personalInfo: {
        firstName: {
            type: String,
            required: true
        },

        lastName: {
            type: String,
            required: true
        },
        
        personalEmail: {
            type: String,
            required: true
        },

        phoneNumber: {
            type: String,
            required: true
        },

        admissionType: {
            type: String,
            enum: ["K-CET", "COMEDK", "Management"]
        },         
    },

    collegeInfo: {
        collegeEmail: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },     

        usn: {
            type: String,
            required: true
        },

        department: { 
            type: Schema.Types.ObjectId, 
            ref: 'Department',
            required: true
        },

        currentSemester: { 
            type: Schema.Types.ObjectId, 
            ref: 'Semester',
            required: true
        },

        currentSection: { 
            type: Schema.Types.ObjectId, 
            ref: 'Section',
            required: true
        }
    },

    academicHistory: [{
        semester: { 
            type: Schema.Types.ObjectId, 
            ref: 'Semester' 
        },

        section: {
            type: Schema.Types.ObjectId,
            ref: "Section"
        },

        courses: [{
            course: { 
                type: Schema.Types.ObjectId, 
                ref: 'Course' 
            },

            tests: [{
                name: String,
                maximumMarks: Number,
                score: Number
            }],

            attendance: {
                totalClasses: Number,
                attendedClasses: Number
            }
        }]
    }]
}, {timestamps: true});

export const Student = mongoose.model("Student", StudentSchema);