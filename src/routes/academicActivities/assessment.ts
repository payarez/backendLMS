// routes/assessment.routes.ts
import { Router, Application } from "express";
import { AssessmentController } from "../../controllers/academicActivities/assessment.controller";
import { authMiddleware } from "../../middleware/auth";

export class AssessmentRoutes {
  public assessmentController: AssessmentController = new AssessmentController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/assessments/public")
      .get(this.assessmentController.getAllAssessments)
      .post(this.assessmentController.createAssessment);

    app.route("/api/assessments/public/:id")
      .get(this.assessmentController.getAssessmentById)
      .patch(this.assessmentController.updateAssessment)
      .delete(this.assessmentController.deleteAssessment);

    app.route("/api/assessments/public/:id/logic")
      .delete(this.assessmentController.deleteAssessmentAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/assessments")
      .get(authMiddleware, this.assessmentController.getAllAssessments)
      .post(authMiddleware, this.assessmentController.createAssessment);

    app.route("/api/assessments/:id")
      .get(authMiddleware, this.assessmentController.getAssessmentById)
      .patch(authMiddleware, this.assessmentController.updateAssessment)
      .delete(authMiddleware, this.assessmentController.deleteAssessment);

    app.route("/api/assessments/:id/logic")
      .delete(authMiddleware, this.assessmentController.deleteAssessmentAdv);
  }
}
