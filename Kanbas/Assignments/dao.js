import Database from "../Database/index.js";

export const findAssignmentsForCourse = async (courseId) => {
  const assignments = Database.assignments.filter(
    (assignment) => assignment.course === courseId
  );
  return assignments;
};

export const createAssignment = async (assignment) => {
  try {
    const newAssignment = {
      ...assignment,
      _id: new Date().getTime().toString(),
    };
    Database.assignments.push(newAssignment);
    return newAssignment;
  } catch (error) {
    throw new Error("Error creating assignment: " + error.message);
  }
};

export const deleteAssignment = async (assignmentId) => {
  Database.assignments = Database.assignments.filter(
    (assignment) => assignment._id !== assignmentId
  );
  return { status: "OK" };
};

export const updateAssignment = async (aid, assignment) => {
  Database.assignments = Database.assignments.map((a) =>
    a._id === aid ? { ...a, ...assignment } : a
  );
  return assignment;
};

export const findAssignmentById = async (assignmentId) => {
  const assignment = Database.assignments.find(
    (assignment) => assignment._id === assignmentId
  );
  return assignment;
}; 