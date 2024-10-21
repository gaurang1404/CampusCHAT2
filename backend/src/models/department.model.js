import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    collegeId: {
        type: Schema.Types.ObjectId, 
        ref: 'College',
        required: true
    },

    name: {
        type: String,
        required: true
    },

    currentSemesters: [
        {
            type: Schema.Types.ObjectId, ref: 'Semester'
        }
    ],

    previousSemesters: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Semester'
        }
    ],

    headOdDepartment: {
        type: Schema.Types.ObjectId,
        ref: "Faculty"
    },
    
    faculty: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Faculty'
        }
    ]

}, {timestamps: true});

export const Department = mongoose.model('Department', DepartmentSchema);
