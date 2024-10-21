import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./src/utils/db.js";
import AdminRouter from "./src/routes/admin.routes.js";
import CollegeRouter from "./src/routes/college.routes.js";
import DepartmentRouter from "./src/routes/department.routes.js";
import SemesterRouter from "./src/routes/semester.routes.js";
import SectionRouter from "./src/routes/section.routes.js";
import FacultyRouter from "./src/routes/faculty.routes.js";
import CourseRouter from "./src/routes/course.routes.js";

dotenv.config({});

const server = express(); 

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cookieParser());

server.use(cors());

server.get("/", (req, res) => {
    res.send("Hello");
});

server.use("/api/v1/admin", AdminRouter);
server.use("/api/v1/college", CollegeRouter);
server.use("/api/v1/department", DepartmentRouter);
server.use("/api/v1/semester", SemesterRouter);
server.use("/api/v1/section", SectionRouter);
server.use("/api/v1/faculty", FacultyRouter);
server.use("/api/v1/course", CourseRouter);

server.use((req, res, next) => {
    res.status(404).json({
        message: "Route not found",
        success: false,
    });
});

server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong",
        success: false,
    });
});

const PORT  = process.env.PORT;
server.listen(PORT || 1000, async () => {
    await connectDb();
    console.log("Server is listening at " + PORT);
})