import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { addDepartment } from "../controllers/department.controller.js";

const DepartmentRouter = express.Router();

DepartmentRouter.route("/add").post(isAuthenticated, isAdmin, addDepartment);

export default DepartmentRouter;