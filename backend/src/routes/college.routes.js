import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { addCollegeInfo, updateCollege } from "../controllers/college.controller.js";

const CollegeRouter = express.Router();

CollegeRouter.route("/add").post(isAuthenticated, isAdmin, addCollegeInfo);
CollegeRouter.route("/update").post(isAuthenticated, isAdmin, updateCollege);


export default CollegeRouter;