import { College } from "../models/college.model.js";
import { Department } from "../models/department.model.js";
import { Faculty } from "../models/faculty.model.js";

// Add a new department
export const addDepartment = async (req, res) => {
    try {
        const college = await College.findOne({ adminId: req.id }).populate("departments");
        if (!college) {
            return res.status(404).json({
                message: "You haven't registered any college on the portal. Add a college before adding departments.",
                success: false,
            });
        }

        const { name } = req.body;

        const existingDepartment = await Department.findOne({ collegeId: college._id, name });
        if (existingDepartment) {
            return res.status(404).json({
                message: "This department already exists.",
                success: false,
            });
        }

        const department = await Department.create({
            collegeId: college._id,
            name,
        });

        college.departments.push(department._id);
        await college.save();

        const updatedCollege = await College.findOne({ adminId: req.id })
            .populate({
                path: "departments",
                populate: [
                    {
                        path: "currentSemesters",
                        populate: [
                            { path: "courses" },
                            
                        ],
                    },
                ],
            })
            .lean(); // Convert to a plain object to prevent circular structures

        return res.status(200).json({
            message: "Department added successfully",
            department,
            college: updatedCollege,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later!",
            success: false,
        });
    }
};

// Assign Head of Department (HOD)
export const addHOD = async (req, res) => {
    try {
        const { departmentId, facultyId } = req.body;

        if (!departmentId || !facultyId) {
            return res.status(400).json({
                message: "Department ID and Faculty ID are required.",
                success: false,
            });
        }

        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(404).json({
                message: "Department not found",
                success: false,
            });
        }

        const faculty = await Faculty.findById(facultyId);
        if (!faculty) {
            return res.status(404).json({
                message: "Faculty not found",
                success: false,
            });
        }

        department.headOfDepartment = faculty._id;
        await department.save();

        return res.status(200).json({
            message: "Head of Department updated successfully",
            department,
            faculty,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later!",
            success: false,
        });
    }
};

// Get all departments for a college
export const getAll = async (req, res) => {
    try {
        const departments = await Department.find({ collegeId: req.id });

        return res.status(200).json({
            message: "Fetched departments successfully",
            departments,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later!",
            success: false,
        });
    }
};

// Delete a department
export const deleteDepartment = async (req, res) => {
    const { departmentId } = req.params;

    try {
        // Find the department
        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(404).json({
                message: "Department not found",
                success: false,
            });
        }

        // Remove the department
        await Department.deleteOne({ _id: departmentId });

        const updatedCollege = await College.findOne({ adminId: req.id })
            .populate({
                path: "departments",
                populate: [
                    {
                        path: "currentSemesters",
                        populate: [
                            { path: "courses" },
                            
                        ],
                    },
                ],
            })
            .lean();

        return res.status(200).json({
            message: "Department deleted successfully",
            college: updatedCollege,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later!",
            success: false,
        });
    }
};
