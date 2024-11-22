import * as dao from "./dao.js";

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
}

export default ModuleRoutes;