// routes/student.routes.ts
import { Router, Application } from "express";
import { StudentController } from "../../controllers/usersAndEnrrollment/student.controller";
import { authMiddleware } from "../../middleware/auth";

export class StudentRoutes {
  public studentController: StudentController = new StudentController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/students/public")
      .get(this.studentController.getAllStudents)
      .post(this.studentController.createStudent);

    app.route("/api/students/public/:id")
      .get(this.studentController.getStudentById)
      .patch(this.studentController.updateStudent)
      .delete(this.studentController.deleteStudent);

    app.route("/api/students/public/:id/logic")
      .delete(this.studentController.deleteStudentAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/students")
      .get(authMiddleware, this.studentController.getAllStudents)
      .post(authMiddleware, this.studentController.createStudent);

    app.route("/api/students/:id")
      .get(authMiddleware, this.studentController.getStudentById)
      .patch(authMiddleware, this.studentController.updateStudent)
      .delete(authMiddleware, this.studentController.deleteStudent);

    app.route("/api/students/:id/logic")
      .delete(authMiddleware, this.studentController.deleteStudentAdv);
  }
}
