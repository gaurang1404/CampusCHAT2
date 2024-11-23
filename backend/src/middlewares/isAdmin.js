import { College } from "../models/college.model.js";

const isAdmin = async (req, res, next) => {    
    if(req.role !== "Admin"){
        return res.status(400).json({
            message: "You are not authorized for this request",
            success: false
        })
    }  

    next();
}

export default isAdmin;