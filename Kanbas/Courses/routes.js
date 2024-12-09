import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as courseDao from "../Courses/dao.js";

export default function CourseRoutes(app) {
  app.post("/api/courses", (req, res) => {
    try {
      const course = dao.createCourse(req.body);
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: "Error creating course" });
    }
  });

  app.get("/api/courses", (req, res) => {
    try {
      const courses = dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Error fetching courses" });
    }
  });

  app.get("/api/courses/:courseId", (req, res) => {
    try {
      const { courseId } = req.params;
      const course = dao.findCourseById(courseId);
      if (!course) {
        res.status(404).json({ error: "Course not found" });
        return;
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: "Error fetching course" });
    }
  });

  app.put("/api/courses/:courseId", (req, res) => {
    try {
      const { courseId } = req.params;
      const status = dao.updateCourse(courseId, req.body);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Error updating course" });
    }
  });

  app.delete("/api/courses/:courseId", (req, res) => {
    try {
      const { courseId } = req.params;
      const status = dao.deleteCourse(courseId);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Error deleting course" });
    }
  });

  app.get("/api/courses/:courseId/modules", (req, res) => {
    try {
      const { courseId } = req.params;
      const modules = modulesDao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      res.status(500).json({ error: "Error fetching modules" });
    }
  });

  app.post("/api/courses/:courseId/modules", (req, res) => {
    try {
      const { courseId } = req.params;
      const module = {
        ...req.body,
        course: courseId,
      };
      const newModule = modulesDao.createModule(module);
      res.json(newModule);
    } catch (error) {
      res.status(500).json({ error: "Error creating module" });
    }
  });

  app.get("/api/users/current/courses", async (req, res) => {
    const currentUser = req.session["currentUser"];
    const courses = await courseDao.findCoursesForEnrolledUser(currentUser._id);
    res.json(courses);
  });
};