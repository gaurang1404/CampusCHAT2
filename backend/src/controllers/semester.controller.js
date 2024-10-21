import { Semester } from "../models/semester.model.js";
import { Department } from "../models/department.model.js";

export const addSemester = async (req, res) => {
    try {
        const { departmentId, number, year, isCurrentSemester } = req.body;

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
            isCurrentSemester
        });

        const department = await Department.findById(departmentId);  

        if (!department) {
            return res.status(404).json({
                message: "Department not found",
                success: false
            });
        }

        if (isCurrentSemester) {
            department.currentSemesters.push(semester._id);
        } else {
            department.previousSemesters.push(semester._id);
        }

        await department.save();

        return res.status(200).json({
            message: "Semester added successfully",
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

