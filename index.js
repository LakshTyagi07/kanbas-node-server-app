import express from 'express';
import cors from 'cors';
import session from 'express-session';
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";

const app = express();

// Configure CORS
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

// Configure Session
app.use(session({
    secret: "any string",
    resave: false,
    saveUninitialized: true,
}));

// Parse JSON payloads
app.use(express.json());

// Root route handler
app.get("/", (req, res) => {
    res.send("Welcome to Full Stack Development!");
});

// Apply routes
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);

// Start server
app.listen(process.env.PORT || 4000);