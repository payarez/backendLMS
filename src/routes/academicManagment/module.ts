// routes/module.routes.ts
import { Router, Application } from "express";
import { ModuleController } from "../../controllers/academicManagment/module.controller";
import { authMiddleware } from "../../middleware/auth";

export class ModuleRoutes {
  public moduleController: ModuleController = new ModuleController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/modules/public")
      .get(this.moduleController.getAllModules)
      .post(this.moduleController.createModule);

    app.route("/api/modules/public/:id")
      .get(this.moduleController.getModuleById)
      .patch(this.moduleController.updateModule)
      .delete(this.moduleController.deleteModule);

    app.route("/api/modules/public/:id/logic")
      .delete(this.moduleController.deleteModuleAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/modules")
      .get(authMiddleware, this.moduleController.getAllModules)
      .post(authMiddleware, this.moduleController.createModule);

    app.route("/api/modules/:id")
      .get(authMiddleware, this.moduleController.getModuleById)
      .patch(authMiddleware, this.moduleController.updateModule)
      .delete(authMiddleware, this.moduleController.deleteModule);

    app.route("/api/modules/:id/logic")
      .delete(authMiddleware, this.moduleController.deleteModuleAdv);
  }
}
