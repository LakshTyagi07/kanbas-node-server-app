import Database from "../Database/index.js";

export function findAllCourses() {
  return Database.courses;
}

export function createCourse(course) {
  const newCourse = { 
    ...course, 
    _id: new Date().getTime().toString(),
    published: false 
  };
  Database.courses.push(newCourse);
  return newCourse;
}

export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments, users } = Database;
  const user = users.find(u => u._id === userId);
  
  const enrolledCourses = courses.filter((course) =>
    enrollments.some((enrollment) => {
      if (user.role === "FACULTY") {
        return enrollment.user === userId && enrollment.course === course._id;
      }
      return enrollment.user === userId && 
             enrollment.course === course._id && 
             course.published === true;
    })
  );
  return enrolledCourses;
}

export function deleteCourse(courseId) {
  const { courses, enrollments } = Database;
  Database.courses = courses.filter((course) => course._id !== courseId);
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment.course !== courseId
  );
}

export function updateCourse(courseId, courseUpdates) {
  const { courses } = Database;
  const course = courses.find((c) => c._id === courseId);
  if (!course) return null;
  Object.assign(course, courseUpdates);
  return course;
}

export function publishCourse(courseId) {
  const course = Database.courses.find((c) => c._id === courseId);
  if (course) {
    course.published = true;
    return course;
  }
  return null;
}
