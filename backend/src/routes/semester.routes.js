import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { addSemester, deleteSemester, toggleSemester } from "../controllers/semester.controller.js";

const SemesterRouter = express.Router();

SemesterRouter.route("/add").post(isAuthenticated, isAdmin, addSemester);
SemesterRouter.route("/delete").post(isAuthenticated, isAdmin, deleteSemester);
SemesterRouter.route("/toggle/:semesterId").post(isAuthenticated, isAdmin, toggleSemester);

export default SemesterRouter;