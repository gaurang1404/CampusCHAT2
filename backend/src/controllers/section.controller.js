import { Course } from "../models/course.model.js";
import { Faculty } from "../models/faculty.model.js";
import { Section } from "../models/section.model.js";
import { Semester } from "../models/semester.model.js";

export const addSection = async (req, res) => {
    try{
        const { semesterId, name } = req.body;

        const semester = await Semester.findOne({_id: semesterId});
        if(!semester){
            return res.status(404).json({
                message: "Semester not found",
                success: false
            });
        }

        const existingSection = await Section.findOne({semesterId, name});
        if(existingSection){
            return res.status(400).json({
                message: "This section already exists",
                success: false
            });
        }

        const section = await Section.create({
            semesterId,
            name
        });

        if(!semester.sections){
            semester.sections = [];
        }

        semester.sections.push(section._id);

        await semester.save();

        return res.status(200).json({
            message: "Section added successfully",
            section,
            semester,
            success: true
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later!",
            success: false
        });
    }
}

export const assignCourse = async (req, res) => {
    try{
        const { sectionId } = req.params;
        const { courseId, facultyId } = req.body;

        if(!courseId || !facultyId){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const existingSection = await Section.findOne({_id: sectionId});
        if(!existingSection){
            return res.status(400).json({
                message: "This section does not exists",
                success: false
            });
        }

        const existingCourse = await Course.findOne({_id: courseId});        
        const existingFaculty = await Faculty.findOne({_id: facultyId});

        if(!existingCourse){
            return res.status(400).json({
                message: "Course ID is incorrect",
                success: false
            });
        }

        if(!existingFaculty){
            return res.status(400).json({
                message: "Faculty ID is incorrect",
                success: false
            });
        }

        if(!existingSection.courseFacultyMapping){
            existingSection.courseFacultyMapping = [];
        }

        existingSection.courseFacultyMapping.push({
            courseId,
            facultyId
        });

        await existingSection.save();

        if(!existingFaculty.courses){
            existingFaculty.courses = [];
        }

        existingFaculty.courses.push(courseId);

        if(!existingFaculty.sections){
            existingFaculty.sections = [];
        }

        existingFaculty.sections.push(sectionId);

        await existingFaculty.save();

        return res.status(200).json({
            message: "Course assigned successfully",
            section: existingSection,
            faculy: existingFaculty,
            success: true
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later!",
            success: false
        });
    }
}