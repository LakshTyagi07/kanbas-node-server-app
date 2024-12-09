import Database from "../Database/index.js";

export function findAllCourses() {
    return Database.courses;
}

export function findCourseById(courseId) {
    return Database.courses.find((course) => course._id === courseId);
}

export function findCoursesForUser(userId) {
    const user = Database.users.find(user => user._id === userId);
    if (user?.role === "FACULTY") {
        return Database.courses;
    }
    const enrollments = Database.enrollments.filter(
        (enrollment) => enrollment.user === userId
    );
    const courses = enrollments.map((enrollment) =>
        Database.courses.find((course) => course._id === enrollment.course)
    );
    return courses;
}

export function createCourse(course) {
    const newCourse = { ...course, _id: new Date().getTime().toString() };
    Database.courses.push(newCourse);
    return newCourse;
}

export function updateCourse(courseId, courseUpdates) {
    const { courses } = Database;
    const course = courses.find((course) => course._id === courseId);
    Object.assign(course, courseUpdates);
    return course;
}

export function deleteCourse(courseId) {
    Database.courses = Database.courses.filter(
        (course) => course._id !== courseId
    );
    Database.enrollments = Database.enrollments.filter(
        (enrollment) => enrollment.course !== courseId
    );
    return { status: "OK" };
}

export const findCoursesForEnrolledUser = (userId) => {
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.filter((course) =>
        enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;};