// routes/tag.routes.ts
import { Router, Application } from "express";
import { TagController } from "../../controllers/forumsAndCommunity/tag.controller";
import { authMiddleware } from "../../middleware/auth";

export class TagRoutes {
  public tagController: TagController = new TagController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/tags/public")
      .get(this.tagController.getAllTags)
      .post(this.tagController.createTag);

    app.route("/api/tags/public/:id")
      .get(this.tagController.getTagById)
      .patch(this.tagController.updateTag)
      .delete(this.tagController.deleteTag);

    app.route("/api/tags/public/:id/logic")
      .delete(this.tagController.deleteTagAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/tags")
      .get(authMiddleware, this.tagController.getAllTags)
      .post(authMiddleware, this.tagController.createTag);

    app.route("/api/tags/:id")
      .get(authMiddleware, this.tagController.getTagById)
      .patch(authMiddleware, this.tagController.updateTag)
      .delete(authMiddleware, this.tagController.deleteTag);

    app.route("/api/tags/:id/logic")
      .delete(authMiddleware, this.tagController.deleteTagAdv);
  }
}
