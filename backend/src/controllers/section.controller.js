import { College } from "../models/college.model.js";
import { Course } from "../models/course.model.js";
import { Faculty } from "../models/faculty.model.js";
import { Section } from "../models/section.model.js";
import { Semester } from "../models/semester.model.js";
import { CourseFaculty } from "../models/courseFaculty.model.js";

export const addSection = async (req, res) => {
    try {
        const { semesterId, name } = req.body;

        // Create a new section
        const newSection = new Section({
            semesterId,
            name
        });

        // Save the new section
        await newSection.save();

        // Fetch all courses in the semester
        const semester = await Semester.findById(semesterId).populate('courses');

        // Map all courses to the new section with null faculty
        for (let course of semester.courses) {
            const newCourseFaculty = new CourseFaculty({
                semesterId,
                sectionId: newSection._id,
                courseId: course._id,
                facultyId: null // Set facultyId as null initially
            });
            await newCourseFaculty.save();
        }

        // Add the new section to the Semester's sections array
        semester.sections.push(newSection._id);
        await semester.save();

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
            message: "Section added successfully",
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


export const assignCourse = async (req, res) => {
    try {
        const { sectionId } = req.params;
        const { courseId, facultyId } = req.body;

        if (!courseId || !facultyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const existingSection = await Section.findOne({ _id: sectionId });
        if (!existingSection) {
            return res.status(400).json({
                message: "This section does not exists",
                success: false
            });
        }

        const existingCourse = await Course.findOne({ _id: courseId });
        const existingFaculty = await Faculty.findOne({ _id: facultyId });

        if (!existingCourse) {
            return res.status(400).json({
                message: "Course ID is incorrect",
                success: false
            });
        }

        if (!existingFaculty) {
            return res.status(400).json({
                message: "Faculty ID is incorrect",
                success: false
            });
        }

        // Find the course mapping and update its faculty
        const courseMapping = existingSection.courseFacultyMapping.find(
            mapping => mapping.course.toString() === courseId
        );

        if (!courseMapping) {
            return res.status(400).json({
                message: "This course is not assigned to this section",
                success: false
            });
        }

        courseMapping.faculty = facultyId;
        await existingSection.save();       
        await existingFaculty.save();

        return res.status(200).json({
            message: "Course assigned successfully",
            section: existingSection,
            faculty: existingFaculty,
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

export const deleteSection = async (req, res) => {
    try {
        const { sectionId } = req.params;

        // Find the section to delete
        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).json({
                message: "Section not found",
                success: false,
            });
        }

        // Remove the section from its semester
        const semester = await Semester.findById(section.semesterId);
        if (semester) {
            semester.sections = semester.sections.filter(
                (id) => id.toString() !== sectionId
            );
            await semester.save();
        }

        // Remove all course-faculty mappings for this section
        await CourseFaculty.deleteMany({ sectionId });

        // Delete the section
        await Section.findByIdAndDelete(sectionId);

        // Fetch updated college details to return
        const college = await College.findOne({ adminId: req.id }).populate({
            path: "departments",
            populate: [
                {
                    path: "currentSemesters",
                    populate: [
                        {
                            path: "courses",
                        },
                        {
                            path: "sections",
                        },
                    ],
                },
            ],
        });

        return res.status(200).json({
            message: "Section deleted successfully",
            college,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later!",
            success: false,
        });
    }
};
