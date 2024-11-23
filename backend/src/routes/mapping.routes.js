// `${API_ENDPOINT}/mapping/${sectionId}`

import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getMapping } from "../controllers/mapping.controller.js";

const MappingRouter = express.Router();

MappingRouter.route("/:sectionId").get(isAuthenticated, isAdmin, getMapping);

export default MappingRouter;