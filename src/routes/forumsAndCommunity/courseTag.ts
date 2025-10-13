// routes/courseTag.routes.ts
import { Router, Application } from "express";
import { CourseTagController } from "../../controllers/forumsAndCommunity/courseTag.controller";
import { authMiddleware } from "../../middleware/auth";

export class CourseTagRoutes {
  public courseTagController: CourseTagController = new CourseTagController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/course-tags/public")
      .get(this.courseTagController.getAllCourseTags)
      .post(this.courseTagController.createCourseTag);

    app.route("/api/course-tags/public/:id")
      .get(this.courseTagController.getCourseTagById)
      .patch(this.courseTagController.updateCourseTag)
      .delete(this.courseTagController.deleteCourseTag);

    app.route("/api/course-tags/public/:id/logic")
      .delete(this.courseTagController.deleteCourseTagAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/course-tags")
      .get(authMiddleware, this.courseTagController.getAllCourseTags)
      .post(authMiddleware, this.courseTagController.createCourseTag);

    app.route("/api/course-tags/:id")
      .get(authMiddleware, this.courseTagController.getCourseTagById)
      .patch(authMiddleware, this.courseTagController.updateCourseTag)
      .delete(authMiddleware, this.courseTagController.deleteCourseTag);

    app.route("/api/course-tags/:id/logic")
      .delete(authMiddleware, this.courseTagController.deleteCourseTagAdv);
  }
}
