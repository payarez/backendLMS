// routes/enrollment.routes.ts
import { Router, Application } from "express";
import { EnrollmentController } from "../../controllers/usersAndEnrrollment/enrollment.controller";
import { authMiddleware } from "../../middleware/auth";

export class EnrollmentRoutes {
  public enrollmentController: EnrollmentController = new EnrollmentController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/enrollments/public")
      .get(this.enrollmentController.getAllEnrollments)
      .post(this.enrollmentController.createEnrollment);

    app.route("/api/enrollments/public/:id")
      .get(this.enrollmentController.getEnrollmentById)
      .patch(this.enrollmentController.updateEnrollment)
      .delete(this.enrollmentController.deleteEnrollment);

    app.route("/api/enrollments/public/:id/logic")
      .delete(this.enrollmentController.deleteEnrollmentAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/enrollments")
      .get(authMiddleware, this.enrollmentController.getAllEnrollments)
      .post(authMiddleware, this.enrollmentController.createEnrollment);

    app.route("/api/enrollments/:id")
      .get(authMiddleware, this.enrollmentController.getEnrollmentById)
      .patch(authMiddleware, this.enrollmentController.updateEnrollment)
      .delete(authMiddleware, this.enrollmentController.deleteEnrollment);

    app.route("/api/enrollments/:id/logic")
      .delete(authMiddleware, this.enrollmentController.deleteEnrollmentAdv);
  }
}
