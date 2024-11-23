import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { addSection, assignCourse, deleteSection } from "../controllers/section.controller.js";

const SectionRouter = express.Router();

SectionRouter.route("/add").post(isAuthenticated, isAdmin, addSection);
SectionRouter.route("/delete/:sectionId").delete(isAuthenticated, isAdmin, deleteSection);
SectionRouter.route("/:sectionId/assignCourse").post(isAuthenticated, isAdmin, assignCourse);

export default SectionRouter;