import * as dao from "./dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

function ModuleRoutes(app) {
  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModulesForCourse(courseId);
    res.json(modules);
  };

  const createModule = async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      courseId: courseId,
    };
    const newModule = await dao.createModule(module);
    res.json(newModule);
  };

  const deleteModule = async (req, res) => {
    const { moduleId } = req.params;
    const status = await dao.deleteModule(moduleId);
    res.json(status);
  };

  const updateModule = async (req, res) => {
    const { moduleId } = req.params;
    const status = await dao.updateModule(moduleId, req.body);
    res.json(status);
  };

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModule);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);

  app.put("/api/courses/:courseId/publish", (req, res) => {
    const { courseId } = req.params;
    const course = dao.publishCourse(courseId);
    if (!course) {
      res.sendStatus(404);
      return;
    }
    res.json(course);
  });

  app.post("/api/users/current/courses", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newCourse = dao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  });
}

export default ModuleRoutes;