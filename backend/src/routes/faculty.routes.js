import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import { facultyLogIn, facultySignUp } from "../controllers/faculty.controller.js";

const FacultyRouter = express.Router();

FacultyRouter.route("/signup").post(facultySignUp);
FacultyRouter.route("/login").post(facultyLogIn);

export default FacultyRouter;