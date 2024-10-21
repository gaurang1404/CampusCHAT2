import { Course } from "../models/course.model.js";
import { Semester } from "../models/semester.model.js";

export const addCourse = async (req, res) => {
    try{
        const {semesterId} = req.params;
        const {name, code, credits} = req.body;

        const existingCourse = await Course.findOne({semesterId, name, code, credits});
        if(existingCourse){
            return res.status(400).json({
                message: "This course already exists",
                success: false
            })
        }
        
        const course = await Course.create({
            semesterId,
            name,
            code,
            credits
        });

        const semester = await Semester.findOne({_id: semesterId});
        if(semester.courses){
            semester.courses = [];
        }

        semester.courses.push(course._id);
        await semester.save();

        return res.status(200).json({
            message: "Course added successfully",
            course,
            semester,
            success: true
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Somehing went wrong, please try again later!",
            success: false
        });
    }
}