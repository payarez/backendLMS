// routes/attempt.routes.ts
import { Router, Application } from "express";
import { AttemptController } from "../../controllers/academicActivities/attempt.controller";
import { authMiddleware } from "../../middleware/auth";

export class AttemptRoutes {
  public attemptController: AttemptController = new AttemptController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/attempts/public")
      .get(this.attemptController.getAllAttempts)
      .post(this.attemptController.createAttempt);

    app.route("/api/attempts/public/:id")
      .get(this.attemptController.getAttemptById)
      .patch(this.attemptController.updateAttempt)
      .delete(this.attemptController.deleteAttempt);

    app.route("/api/attempts/public/:id/logic")
      .delete(this.attemptController.deleteAttemptAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/attempts")
      .get(authMiddleware, this.attemptController.getAllAttempts)
      .post(authMiddleware, this.attemptController.createAttempt);

    app.route("/api/attempts/:id")
      .get(authMiddleware, this.attemptController.getAttemptById)
      .patch(authMiddleware, this.attemptController.updateAttempt)
      .delete(authMiddleware, this.attemptController.deleteAttempt);

    app.route("/api/attempts/:id/logic")
      .delete(authMiddleware, this.attemptController.deleteAttemptAdv);
  }
}
