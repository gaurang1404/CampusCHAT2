import { College } from "../models/college.model.js"
import { Department } from "../models/department.model.js";

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

        const department = {
            collegeId: college._id,
            name
        }

        await Department.create(department);
        
        return res.status(200).json({
            message: "Department added successfully",
            department,
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