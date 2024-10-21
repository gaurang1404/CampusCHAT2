import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { addCourse } from "../controllers/course.controller.js";

const CourseRouter = express.Router();

CourseRouter.route("/:semesterId/add").post(isAuthenticated, isAdmin, addCourse);

export default CourseRouter;