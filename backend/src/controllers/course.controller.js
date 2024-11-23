import { Course } from "../models/course.model.js";
import { Semester } from "../models/semester.model.js";
import {College} from "../models/college.model.js";
import mongoose from "mongoose";
import { Section } from "../models/section.model.js";
import { CourseFaculty } from "../models/courseFaculty.model.js";
import { Faculty } from "../models/faculty.model.js";

export const addCourse = async (req, res) => {
    try {
        const { name, code, credits, semesterId } = req.body;

        // Create a new course
        const newCourse = new Course({
            name,
            code,
            credits,
            semesterId
        });

        // Save the new course
        await newCourse.save();

        // Add the course to the Semester's courses array
        const semester = await Semester.findById(semesterId);
        semester.courses.push(newCourse._id);
        await semester.save();

        // If there are existing sections, map the new course to each section with null faculty
        const sections = await Section.find({ semesterId });
        for (let section of sections) {
            const newCourseFaculty = new CourseFaculty({
                semesterId,
                sectionId: section._id,
                courseId: newCourse._id,
                facultyId: null // Set facultyId as null initially
            });
            await newCourseFaculty.save();
        }

        // Fetch college details to return the updated state
        const college = await College.findOne({ adminId: req.id }).populate({
            path: "departments",
            populate: [
                {
                    path: "currentSemesters",
                    populate: [
                        {
                            path: "courses"
                        },
                        {
                            path: "sections",                            
                        },
                    ],
                },
            ],
        });

        return res.status(200).json({
            message: "Course added successfully",
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



export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;  

        // Find the course by its ID
        const existingCourse = await Course.findById(courseId); // Assuming you're using Mongoose and _id as the primary key

        // Check if the course exists
        if (!existingCourse) {
            return res.status(400).json({
                message: "This course doesn't exist",
                success: false
            });
        }

        // Delete the course from the database
        await Course.findByIdAndDelete(courseId);

        // Remove course from all semesters
        await Semester.updateMany(
            { courses: courseId },
            { $pull: { courses: courseId } }
        );

        // Remove all CourseFaculty mappings related to this course
        await CourseFaculty.deleteMany({ courseId });

        // Remove course from all sections
        const sections = await Section.find({ "courseFacultyMapping.course": courseId });
        for (let section of sections) {
            section.courseFacultyMapping = section.courseFacultyMapping.filter(mapping => mapping.course.toString() !== courseId);
            await section.save();
        }

        // Fetch college details
        const college = await College.findOne({ adminId: req.id }).populate({
            path: "departments",
            populate: [
                {
                    path: "currentSemesters",
                    populate: [
                        {
                            path: "courses"
                        },
                        {
                            path: "sections",                            
                        },
                    ],
                },
            ],
        });

        return res.status(200).json({
            message: "Course deleted successfully",
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


export const courseFacultyAssignment = async (req, res) => {
    try {
        const { semesterId, sectionId, courseId, facultyId } = req.body;

        // Check if a mapping already exists for the course, section, and semester
        const existingMapping = await CourseFaculty.findOne({
            semesterId,
            sectionId,
            courseId,
        });

        let previousFacultyId = null;
        if (existingMapping) {
            previousFacultyId = existingMapping.facultyId;
            // Update the mapping to the new faculty
            existingMapping.facultyId = facultyId;
            await existingMapping.save();
        } else {
            // If no mapping exists, create a new one
            const newMapping = new CourseFaculty({
                semesterId,
                sectionId,
                courseId,
                facultyId,
            });
            await newMapping.save();
        }

        // If there was a previous faculty, remove the sectionId from their sections
        if (previousFacultyId) {
            await Faculty.findByIdAndUpdate(
                previousFacultyId,
                {
                    $pull: { sections: sectionId }, // Remove the section from the previous faculty
                },
                { new: true }
            );
        }

        // Add the sectionId to the new faculty's sections
        if (facultyId) {
            await Faculty.findByIdAndUpdate(
                facultyId,
                {
                    $addToSet: { // Prevent duplicate entries
                        sections: sectionId,
                        courses: courseId,
                    },
                },
                { new: true }
            );
        }

        // Fetch the updated college details
        const college = await College.findOne({ adminId: req.id }).populate({
            path: "departments",
            populate: [
                {
                    path: "currentSemesters",
                    populate: [
                        {
                            path: "courses"
                        },
                        {
                            path: "sections",                            
                        },
                    ],
                },
            ],
        });

        return res.status(200).json({
            message: "Course-faculty mapping updated successfully.",
            college,
            success: true,
        });
    } catch (error) {
        console.error("Error in courseFacultyAssignment:", error);
        return res.status(500).json({
            message: "Something went wrong, please try again later!",
            success: false,
        });
    }
};
