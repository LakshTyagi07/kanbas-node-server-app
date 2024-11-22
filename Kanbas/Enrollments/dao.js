import Database from "../Database/index.js";

export const findAllEnrollments = () => {
  return Database.enrollments;
};

export const findEnrollmentsForCourse = (courseId) => {
  return Database.enrollments.filter(
    (enrollment) => enrollment.course === courseId
  );
};

export const findEnrollmentsForUser = (userId) => {
  return Database.enrollments.filter(
    (enrollment) => enrollment.user === userId
  );
};

export const enrollUserInCourse = (userId, courseId) => {
  const enrollment = {
    _id: new Date().getTime().toString(),
    user: userId,
    course: courseId,
    grade: null,
    status: "ENROLLED",
    startDate: new Date().toISOString()
  };
  Database.enrollments.push(enrollment);
  return enrollment;
};

export const unenrollUserFromCourse = (userId, courseId) => {
  Database.enrollments = Database.enrollments.filter(
    (enrollment) => 
      !(enrollment.user === userId && enrollment.course === courseId)
  );
  return { status: "OK" };
};

export const isUserEnrolledInCourse = (userId, courseId) => {
  return Database.enrollments.some(
    (enrollment) => 
      enrollment.user === userId && enrollment.course === courseId
  );
}; 