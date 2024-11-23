import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";
import { College } from "../models/college.model.js";

export const adminSignUp = async (req, res) => {
    try{   
        const { firstName, lastName,  personalEmail, phoneNumber, collegeEmail, password } = req.body;
        if(!firstName || !lastName|| !personalEmail || !phoneNumber || !collegeEmail || !password){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        
        const existingAdmin = await Admin.findOne({collegeEmail});
        if(existingAdmin){
            return res.status(400).json({
                message: "Admin already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let admin = await Admin.create({
            firstName, 
            lastName,  
            personalEmail, 
            phoneNumber, 
            collegeEmail, 
            password: hashedPassword
        });        
        

        return res.status(200).json({
            message: "Admin signed up successfully",            
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

export const adminLogIn = async (req, res) => {
    try{
        const {collegeEmail, password} = req.body;

        if(!collegeEmail || !password){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        let admin = await Admin.findOne({collegeEmail});
        if(!admin){
            return res.status(400).json({
                message: "Invalid email",
                success: false
            })
        }

        const didPasswordMatch = await bcrypt.compare(password, admin.password);
        if(!didPasswordMatch){
            return res.status(400).json({
                message: "Invalid password",
                success: false
            })
        }

        const tokenData = {
            userId: admin._id,
            role: "Admin"
        };

        admin.role = "Admin";

        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        let college;
        if(admin.collegeId){
            college = await College.findOne({_id: admin.collegeId})
            .populate({
                path: "departments",
                populate: [
                    {
                        path: "currentSemesters",
                        populate: [
                            {
                                path: "courses", 
                            },
                            {
                                path: "sections", // Populates the sections inside currentSemesters                                
                            },
                        ],
                    },
                ],
            })
            .catch(error => {
                console.log(error);                
            });
        }

        admin = admin._doc;

        admin = {
            ...admin,
            password: null
        }               

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "lax" }).json({
            message: "Admin logged in successfully",
            admin,  
            college,          
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

export const adminLogout = async (req, res) => {
    try {
        
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        
        return res.status(200).json({
            message: "Logged out successfully",
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



