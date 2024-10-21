import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { addDepartment, addHOD } from "../controllers/department.controller.js";

const DepartmentRouter = express.Router();

DepartmentRouter.route("/add").post(isAuthenticated, isAdmin, addDepartment);
DepartmentRouter.route("/addHod").post(isAuthenticated, isAdmin, addHOD);

export default DepartmentRouter;