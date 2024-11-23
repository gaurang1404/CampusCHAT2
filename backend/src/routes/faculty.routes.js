import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import { facultyLogIn, facultySignUp, getAll, getFacultyByDepartmentId } from "../controllers/faculty.controller.js";
import isAdmin from "../middlewares/isAdmin.js";

const FacultyRouter = express.Router();

FacultyRouter.route("/getAll").get(isAuthenticated, isAdmin, getAll);
FacultyRouter.route("/signup").post(facultySignUp);
FacultyRouter.route("/login").post(facultyLogIn);
FacultyRouter.route("/get/:departmentId").get(isAuthenticated, isAdmin, getFacultyByDepartmentId);

export default FacultyRouter;