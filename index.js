import "dotenv/config";
import express from "express";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import cors from "cors";
import session from "express-session";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";

const app = express();

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000"
    })
);

app.use(session({
    secret: "any string",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
Lab5(app);
AssignmentRoutes(app);

app.listen(4000);