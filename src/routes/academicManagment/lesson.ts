// routes/lesson.routes.ts
import { Router, Application } from "express";
import { LessonController } from "../../controllers/academicManagment/lesson.controller";
import { authMiddleware } from "../../middleware/auth";

export class LessonRoutes {
  public lessonController: LessonController = new LessonController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/lessons/public")
      .get(this.lessonController.getAllLessons)
      .post(this.lessonController.createLesson);

    app.route("/api/lessons/public/:id")
      .get(this.lessonController.getLessonById)
      .patch(this.lessonController.updateLesson)
      .delete(this.lessonController.deleteLesson);

    app.route("/api/lessons/public/:id/logic")
      .delete(this.lessonController.deleteLessonAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/lessons")
      .get(authMiddleware, this.lessonController.getAllLessons)
      .post(authMiddleware, this.lessonController.createLesson);

    app.route("/api/lessons/:id")
      .get(authMiddleware, this.lessonController.getLessonById)
      .patch(authMiddleware, this.lessonController.updateLesson)
      .delete(authMiddleware, this.lessonController.deleteLesson);

    app.route("/api/lessons/:id/logic")
      .delete(authMiddleware, this.lessonController.deleteLessonAdv);
  }
}
