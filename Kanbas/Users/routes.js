import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (!currentUser) {
      res.sendStatus(403);
      return;
    }
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    console.log("Finding courses for userId:", userId);
    
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      console.log("Current user from session:", currentUser);
      
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    console.log("Sending courses:", courses);
    res.json(courses);
  };

  const account = async (req, res) => {
    const currentUser = req.session['currentUser'];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.get("/api/users/account", account);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.get("/api/users/current/courses", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const courses = courseDao.findCoursesForEnrolledUser(currentUser._id);
    console.log("Sending courses for user:", currentUser._id, courses);
    res.json(courses);
  });
  app.post("/api/users/current/courses", createCourse);
}
