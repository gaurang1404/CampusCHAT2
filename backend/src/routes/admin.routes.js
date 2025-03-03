import express from "express";
import { adminSignUp, adminLogIn, adminLogout } from "../controllers/admin.controller.js";

const AdminRouter = express.Router();

AdminRouter.route("/signup").post(adminSignUp);
AdminRouter.route("/login").post(adminLogIn);
AdminRouter.route("/logout").post(adminLogout);

export default AdminRouter;