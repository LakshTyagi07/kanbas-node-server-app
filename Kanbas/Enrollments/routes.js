import * as dao from "./dao.js";

function EnrollmentRoutes(app) {
  app.get("/api/courses/:courseId/enrollments", async (req, res) => {
    const { courseId } = req.params;
    const enrollments = await dao.findEnrollmentsForCourse(courseId);
    res.json(enrollments);
  });

  app.post("/api/courses/:courseId/enrollments", async (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    
    const enrollment = await dao.enrollUserInCourse(
      currentUser._id, 
      courseId
    );
    res.json(enrollment);
  });

  app.delete("/api/courses/:courseId/enrollments", async (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    
    const status = await dao.unenrollUserFromCourse(
      currentUser._id, 
      courseId
    );
    res.json(status);
  });

  app.get("/api/courses/:courseId/enrollments/check", async (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.json({ enrolled: false });
      return;
    }
    
    const enrolled = await dao.isUserEnrolledInCourse(
      currentUser._id, 
      courseId
    );
    res.json({ enrolled });
  });
}

export default EnrollmentRoutes; 