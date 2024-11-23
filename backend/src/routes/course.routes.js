import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { addCourse, courseFacultyAssignment, deleteCourse } from "../controllers/course.controller.js";

const CourseRouter = express.Router();

CourseRouter.route("/:semesterId/add").post(isAuthenticated, isAdmin, addCourse);
CourseRouter.route("/course-faculty-assignment").put(isAuthenticated, isAdmin, courseFacultyAssignment);
CourseRouter.route("/delete").post(isAuthenticated, isAdmin, deleteCourse);

export default CourseRouter;