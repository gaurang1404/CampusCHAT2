import express from "express";
import { adminSignUp, adminLogIn } from "../controllers/admin.controller.js";

const AdminRouter = express.Router();

AdminRouter.route("/signup").post(adminSignUp);
AdminRouter.route("/login").post(adminLogIn);

export default AdminRouter;