import { Student } from "../models/student.model.js";

export const getStudentByDepartmentId = async (req, res) => { 
    try{   
        const { departmentId } = req.params;
        
        const students = await Student.find({department: departmentId });        

        return res.status(200).json({
            message: "Students fetched successfully",   
            students,         
            success: true
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Somehing went wrong, please try again later!",
            success: false
        });
    }
}

export const getAll = async (req, res) => { 
    try{   

        const students = await Student.find();        

        return res.status(200).json({
            message: "Students fetched successfully",   
            students,         
            success: true
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Somehing went wrong, please try again later!",
            success: false
        });
    }
}