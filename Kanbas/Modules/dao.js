import Database from "../Database/index.js";

export const findModulesForCourse = async (courseId) => {
  const modules = Database.modules.filter(
    (module) => module.courseId === courseId);
  return modules;
};

export const createModule = async (module) => {
  module._id = new Date().getTime().toString();
  Database.modules.push(module);
  return module;
};

export const deleteModule = async (moduleId) => {
  Database.modules = Database.modules.filter(
    (module) => module._id !== moduleId);
  return { status: "OK" };
};

export const updateModule = async (moduleId, moduleUpdates) => {
  Database.modules = Database.modules.map((module) =>
    module._id === moduleId ? { ...module, ...moduleUpdates } : module
  );
  return moduleUpdates;
};