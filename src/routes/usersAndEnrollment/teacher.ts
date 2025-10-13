// routes/teacher.routes.ts
import { Router, Application } from "express";
import { TeacherController } from "../../controllers/usersAndEnrrollment/teacher.controller";
import { authMiddleware } from "../../middleware/auth";

export class TeacherRoutes {
  public teacherController: TeacherController = new TeacherController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/teachers/public")
      .get(this.teacherController.getAllTeachers)
      .post(this.teacherController.createTeacher);

    app.route("/api/teachers/public/:id")
      .get(this.teacherController.getTeacherById)
      .patch(this.teacherController.updateTeacher)
      .delete(this.teacherController.deleteTeacher);

    app.route("/api/teachers/public/:id/logic")
      .delete(this.teacherController.deleteTeacherAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/teachers")
      .get(authMiddleware, this.teacherController.getAllTeachers)
      .post(authMiddleware, this.teacherController.createTeacher);

    app.route("/api/teachers/:id")
      .get(authMiddleware, this.teacherController.getTeacherById)
      .patch(authMiddleware, this.teacherController.updateTeacher)
      .delete(authMiddleware, this.teacherController.deleteTeacher);

    app.route("/api/teachers/:id/logic")
      .delete(authMiddleware, this.teacherController.deleteTeacherAdv);
  }
}
