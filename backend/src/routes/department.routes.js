import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { addDepartment, addHOD, deleteDepartment, getAll } from "../controllers/department.controller.js";

const DepartmentRouter = express.Router();

DepartmentRouter.route("/add").post(isAuthenticated, isAdmin, addDepartment);
DepartmentRouter.route("/delete/:departmentId").delete(isAuthenticated, isAdmin, deleteDepartment);
DepartmentRouter.route("/addHod").post(isAuthenticated, isAdmin, addHOD);
DepartmentRouter.route("/getAll").get(isAuthenticated, isAdmin, getAll);

export default DepartmentRouter;