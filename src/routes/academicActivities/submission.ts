// routes/submission.routes.ts
import { Router, Application } from "express";
import { SubmissionController } from "../../controllers/academicActivities/submission.controller";
import { authMiddleware } from "../../middleware/auth";

export class SubmissionRoutes {
  public submissionController: SubmissionController = new SubmissionController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/submissions/public")
      .get(this.submissionController.getAllSubmissions)
      .post(this.submissionController.createSubmission);

    app.route("/api/submissions/public/:id")
      .get(this.submissionController.getSubmissionById)
      .patch(this.submissionController.updateSubmission)
      .delete(this.submissionController.deleteSubmission);

    app.route("/api/submissions/public/:id/logic")
      .delete(this.submissionController.deleteSubmissionAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/submissions")
      .get(authMiddleware, this.submissionController.getAllSubmissions)
      .post(authMiddleware, this.submissionController.createSubmission);

    app.route("/api/submissions/:id")
      .get(authMiddleware, this.submissionController.getSubmissionById)
      .patch(authMiddleware, this.submissionController.updateSubmission)
      .delete(authMiddleware, this.submissionController.deleteSubmission);

    app.route("/api/submissions/:id/logic")
      .delete(authMiddleware, this.submissionController.deleteSubmissionAdv);
  }
}
