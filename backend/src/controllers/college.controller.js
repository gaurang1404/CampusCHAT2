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

        const alreadyAdminOfOtherCollege = await College.findOne({ adminId: req.id });
        if(alreadyAdminOfOtherCollege){
            return res.status(400).json({
                message: `You already are an admin of ${alreadyAdminOfOtherCollege.name}`,
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

export const updateCollege = async (req, res) => {
    try{
        const { name, state, location, principal, vicePrincipal, departments} = req.body;

        const existingCollege = await College.findOne({ name });
        if (!existingCollege) {
            return res.status(400).json({
                message: "This college doesn't exist",
                success: false
            })
        }

        if (!existingCollege.adminId.equals(req.id)) {
            return res.status(400).json({
                message: "You are not authorized to change details of any other college",
                success: false
            });
        }

        existingCollege.name = name ? name : existingCollege.name;
        existingCollege.state = state ? state : existingCollege.state;
        existingCollege.location = location ? location : existingCollege.location;
        existingCollege.principal = principal ? principal : existingCollege.principal;
        existingCollege.vicePrincipal = vicePrincipal ? vicePrincipal : existingCollege.vicePrincipal;
        existingCollege.departments = departments ? departments : existingCollege.departments;

        await existingCollege.save();
        
        return res.status(200).json({
            message: "College updated successfully",
            existingCollege,
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

