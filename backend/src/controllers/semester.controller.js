import { Semester } from "../models/semester.model.js";
import { Department } from "../models/department.model.js";
import mongoose from "mongoose";
import { College } from "../models/college.model.js";

export const addSemester = async (req, res) => {
    try {
        let {departmentId} = req.body;
        const { number, year, isCurrentSemester } = req.body;
        departmentId = new mongoose.Types.ObjectId(departmentId);
        console.log(departmentId);          

        const existingSemester = await Semester.findOne({ departmentId, number, year });
        if (existingSemester) {
            return res.status(400).json({
                message: "This semester is already registered",
                success: false
            });
        }

        const semester = await Semester.create({
            departmentId,
            number,
            year,
        });

        const department = await Department.findById(departmentId);  

        if (!department) {
            return res.status(404).json({
                message: "Department not found",
                success: false
            });
        }

        department.currentSemesters.push(semester._id);        

        await department.save();

        const college = await College.findOne({ adminId: req.id }).populate({
            path: "departments",
            populate: [
                {
                    path: "currentSemesters",
                    populate: [
                        {
                            path: "courses", // Populates the courses inside currentSemesters
                            
                        },
                        {
                            path: "sections", // Populates the sections inside currentSemesters
                            
                        },
                    ],
                },
            ],
        });
        

        return res.status(200).json({
            message: "Semester added successfully",
            college,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later!",
            success: false
        });
    }
};

export const toggleSemester = async (req, res) => {
    try {
        const { semesterId } = req.params;

        if (!semesterId) {
            return res.status(404).json({
                message: "Something is missing",
                success: false
            });
        }

        const semester = await Semester.findOne({ _id: semesterId }).populate("departmentId");
        if (!semester) {
            return res.status(404).json({
                message: "Semester not found",
                success: false
            });
        }

        const department = await Department.findById(semester.departmentId);
        if (!department) {
            return res.status(404).json({
                message: "Department not found",
                success: false
            });
        }

        if (semester.isCurrentSemester) {
            // If it is currently a current semester, remove it from currentSemesters
            department.currentSemesters = department.currentSemesters.filter(s => 
                s.toString() !== semester._id.toString()
            );
            // Add to previousSemesters
            department.previousSemesters.push(semester._id);
        } else {
            // If it's being set as the current semester, remove it from previousSemesters
            department.previousSemesters = department.previousSemesters.filter(s => 
                s.toString() !== semester._id.toString()
            );
            department.currentSemesters.push(semester._id);
        }

        // Toggle the semester's current status
        semester.isCurrentSemester = !semester.isCurrentSemester;
        await semester.save(); 
        await department.save(); 

        return res.status(200).json({
            message: "Semester toggled successfully",
            semester, 
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later!",
            success: false
        });
    }
};

export const deleteSemester = async (req, res) => {
    try {
        const { departmentId, semesterId } = req.body;
        
        if (!departmentId || !semesterId) {
            return res.status(404).json({
                message: "Both Department and Semester IDs are required",
                success: false
            });
        }

        const existingDepartment = await Department.findOne({ _id: departmentId });
        if (!existingDepartment) {
            return res.status(404).json({
                message: "Department does not exist",
                success: false
            });
        }

        const existingSemester = await Semester.findOne({ _id: semesterId });
        if (!existingSemester) {
            return res.status(400).json({
                message: "Semester does not exist",
                success: false
            });
        }

        // Delete the semester document
        await Semester.deleteOne({ _id: semesterId });

        // Update the department's currentSemesters array
        existingDepartment.currentSemesters = existingDepartment.currentSemesters.filter(
            semId => semId.toString() !== semesterId
        );

        await existingDepartment.save();

        // Fetch and populate the updated college data
        const college = await College.findOne({ adminId: req.id }).populate({
            path: "departments",
            populate: {
                path: 'currentSemesters',
                populate: {
                    path: 'courses'
                }
            },
        });

        return res.status(200).json({
            message: "Semester deleted successfully",
            college,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later!",
            success: false
        });
    }
}


