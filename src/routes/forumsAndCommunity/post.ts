// routes/post.routes.ts
import { Router, Application } from "express";
import { PostController } from "../../controllers/forumsAndCommunity/post.controller";
import { authMiddleware } from "../../middleware/auth";

export class PostRoutes {
  public postController: PostController = new PostController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/posts/public")
      .get(this.postController.getAllPosts)
      .post(this.postController.createPost);

    app.route("/api/posts/public/:id")
      .get(this.postController.getPostById)
      .patch(this.postController.updatePost)
      .delete(this.postController.deletePost);

    app.route("/api/posts/public/:id/logic")
      .delete(this.postController.deletePostAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/posts")
      .get(authMiddleware, this.postController.getAllPosts)
      .post(authMiddleware, this.postController.createPost);

    app.route("/api/posts/:id")
      .get(authMiddleware, this.postController.getPostById)
      .patch(authMiddleware, this.postController.updatePost)
      .delete(authMiddleware, this.postController.deletePost);

    app.route("/api/posts/:id/logic")
      .delete(authMiddleware, this.postController.deletePostAdv);
  }
}
