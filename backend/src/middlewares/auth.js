import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({
            message: "User not authenticated",
            success: false
        });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.id = decode.userId;
        req.role = decode.role;
        next();
    } catch (err) {
        console.log("Token verification error:", err);
        return res.status(400).json({
            message: "Invalid token",
            success: false
        });
    }
}


export default isAuthenticated;