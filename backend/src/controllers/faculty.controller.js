import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { Faculty } from "../models/faculty.model.js";
import { Department } from "../models/department.model.js";

export const facultySignUp = async (req, res) => {
    try {
        const { firstName, lastName, collegeEmail, position, password, departmentId } = req.body;
        if (!firstName || !lastName || !collegeEmail || !position || !password || !departmentId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const existingFacultyWithEmail = await Faculty.findOne({ collegeEmail });
        if (existingFacultyWithEmail) {
            return res.status(400).json({
                message: "Faculty with this email already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const faculty = await Faculty.create({
            firstName,
            lastName,
            collegeEmail,
            password: hashedPassword,
            position,
            departmentId
        });

        const department = await Department.findOne({ _id: departmentId });

        if (!department.faculty) {
            department.faculty = [];
        }

        department.faculty.push(faculty._id);

        await department.save();

        return res.status(200).json({
            message: "Faculty signed up successfully",
            faculty,
            department,
            success: true
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Somehing went wrong, please try again later!",
            success: false
        });
    }
}

export const facultyLogIn = async (req, res) => {
    try {
        const { collegeEmail, password } = req.body;

        if (!collegeEmail || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const faculty = await Faculty.findOne({ collegeEmail });
        if (!faculty) {
            return res.status(400).json({
                message: "Invalid email",
                success: false
            })
        }

        const didPasswordMatch = await bcrypt.compare(password, faculty.password);
        if (!didPasswordMatch) {
            return res.status(400).json({
                message: "Invalid password",
                success: false
            })
        }

        const tokenData = {
            userId: faculty._id,
            role: "Faculty"
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json({
            message: "Faculty logged in successfully",
            success: true
        });


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Somehing went wrong, please try again later!",
            success: false
        });
    }
}

export const getFacultyByDepartmentId = async (req, res) => {
    try {
        const { departmentId } = req.params;

        const faculties = await Faculty.find({ departmentId: departmentId });

        return res.status(200).json({
            message: "Faculties fetched successfully",
            faculties,
            success: true
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Somehing went wrong, please try again later!",
            success: false
        });
    }
}

export const getAll = async (req, res) => {
    try {

        const faculties = await Faculty.find().populate([
            {
                path: "departmentId"
            },            
        ]);

        return res.status(200).json({
            message: "Faculties fetched successfully",
            faculties,
            success: true
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Somehing went wrong, please try again later!",
            success: false
        });
    }
}