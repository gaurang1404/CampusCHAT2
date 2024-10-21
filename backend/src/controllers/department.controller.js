import { College } from "../models/college.model.js"
import { Department } from "../models/department.model.js";
import { Faculty } from "../models/faculty.model.js";

export const addDepartment = async (req, res) => {
    try{
        const college = await College.findOne({adminId: req.id});
        if(!college){
            return res.status(404).json({
                message: "You haven't registered any college on the portal. Add a college before adding departments",
                success: false
            });
        }        

        const { name } = req.body;  
        
        const existingDepartment = await Department.findOne({collegeId: college._id, name});
        if(existingDepartment){
            return res.status(404).json({
                message: "This department already exists",
                success: false
            });
        }

        const department = await Department.create({
            collegeId: college._id,
            name
        });
        
        college.departments.push(department._id);
        await college.save();
        
        return res.status(200).json({
            message: "Department added successfully",
            department,
            college,
            success: true
        });
        
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Somehing went wrong, please try again later!",
            success: false
        })
    }
}

export const addHOD = async (req, res) => {
    try{
        const { departmentId, facultyId } = req.body;
        
        if(!departmentId && !facultyId){
            return res.status(404).json({
                message: "Somehing is missing",
                success: false
            })
        }

        const department = await Department.findOne({_id: departmentId});
        if(!department){
            return res.status(404).json({
                message: "Department not found",
                success: false
            })
        }

        const faculty = await Faculty.findOne({_id: facultyId});
        if(!faculty){
            return res.status(404).json({
                message: "Faculty not found",
                success: false
            })
        }

        department.headOdDepartment = faculty._id;

        await department.save();

        return res.status(200).json({
            message: "Head of department updated successfully",
            department,
            faculty,
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