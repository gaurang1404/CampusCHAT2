import { College } from "../models/college.model.js";

export const addCollegeInfo = async (req, res) => {
    try{
        const { name, state, location, principal, vicePrincipal } = req.body;

        if(!name || !state || !location || !principal || !vicePrincipal){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        const existingCollege = await College.findOne({ name })
        if (existingCollege) {
            return res.status(400).json({
                message: `${name}, is already registered on the portal`,
                success: false
            })
        }              

        const college = {
            adminId: req.id,    
            name,
            state,
            location,
            principal,
            vicePrincipal
        }

        await College.create(college);

        return res.status(200).json({
            message: "College added successfully",
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
