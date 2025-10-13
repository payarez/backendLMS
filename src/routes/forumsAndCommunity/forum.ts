// routes/forum.routes.ts
import { Router, Application } from "express";
import { ForumController } from "../../controllers/forumsAndCommunity/forum.controller";
import { authMiddleware } from "../../middleware/auth";

export class ForumRoutes {
  public forumController: ForumController = new ForumController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/forums/public")
      .get(this.forumController.getAllForums)
      .post(this.forumController.createForum);

    app.route("/api/forums/public/:id")
      .get(this.forumController.getForumById)
      .patch(this.forumController.updateForum)
      .delete(this.forumController.deleteForum);

    app.route("/api/forums/public/:id/logic")
      .delete(this.forumController.deleteForumAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/forums")
      .get(authMiddleware, this.forumController.getAllForums)
      .post(authMiddleware, this.forumController.createForum);

    app.route("/api/forums/:id")
      .get(authMiddleware, this.forumController.getForumById)
      .patch(authMiddleware, this.forumController.updateForum)
      .delete(authMiddleware, this.forumController.deleteForum);

    app.route("/api/forums/:id/logic")
      .delete(authMiddleware, this.forumController.deleteForumAdv);
  }
}
