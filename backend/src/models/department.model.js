import mongoose from 'mongoose';
import { Semester } from './semester.model.js';
import { Section } from './section.model.js';
import { Student } from './student.model.js';
import { Faculty } from './faculty.model.js';

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
    headOfDepartment: {
        type: Schema.Types.ObjectId,
        ref: "Faculty"
    },
    faculty: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Faculty'
        }
    ]
}, { timestamps: true });

// Middleware to cascade delete related documents
DepartmentSchema.pre('remove', async function(next) {
    try {
        // Remove all semesters associated with this department
        await Semester.deleteMany({ departmentId: this._id });

        // Remove all students associated with this department
        await Student.deleteMany({ department: this._id });

        // Remove all faculty associated with this department
        await Faculty.deleteMany({ departmentId: this._id });

        // Find all semesters associated with the department to delete their sections
        const semesters = await Semester.find({ departmentId: this._id });
        const semesterIds = semesters.map(sem => sem._id);

        // Delete all sections within these semesters
        await Section.deleteMany({ semesterId: { $in: semesterIds } });

        next();
    } catch (error) {
        next(error);
    }
});


export const Department = mongoose.model('Department', DepartmentSchema);
