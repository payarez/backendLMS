// routes/course.routes.ts
import { Router, Application } from "express";
import { CourseController } from "../../controllers/academicManagment/course.controller";
import { authMiddleware } from "../../middleware/auth";

export class CourseRoutes {
  public courseController: CourseController = new CourseController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/courses/public")
      .get(this.courseController.getAllCourses)
      .post(this.courseController.createCourse);

    app.route("/api/courses/public/:id")
      .get(this.courseController.getCourseById)
      .patch(this.courseController.updateCourse)
      .delete(this.courseController.deleteCourse);

    app.route("/api/courses/public/:id/logic")
      .delete(this.courseController.deleteCourseAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/courses")
      .get(authMiddleware, this.courseController.getAllCourses)
      .post(authMiddleware, this.courseController.createCourse);

    app.route("/api/courses/:id")
      .get(authMiddleware, this.courseController.getCourseById)
      .patch(authMiddleware, this.courseController.updateCourse)
      .delete(authMiddleware, this.courseController.deleteCourse);

    app.route("/api/courses/:id/logic")
      .delete(authMiddleware, this.courseController.deleteCourseAdv);
  }
}
