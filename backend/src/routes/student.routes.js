import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getAll, getStudentByDepartmentId } from "../controllers/student.controller.js";

const StudentRouter = express.Router();

StudentRouter.route("/getAll").get(isAuthenticated, isAdmin, getAll);
StudentRouter.route("/get/:departmentId").get(isAuthenticated, isAdmin, getStudentByDepartmentId);

export default StudentRouter;