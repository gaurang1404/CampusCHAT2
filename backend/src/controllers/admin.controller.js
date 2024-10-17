import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

export const adminSignUp = async (req, res) => {
    try{        
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin){
            return res.status(400).json({
                message: "Admin already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Admin.create({
            name, 
            email, 
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
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const admin = await Admin.findOne({email});
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

        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json({
            message: "Admin logged in successfully",            
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