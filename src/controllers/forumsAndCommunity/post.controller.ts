// controllers/post.controller.ts
import { Request, Response } from "express";
import { Post, PostI } from "../../models/forumsAndCommunity/Post";

export class PostController {

  public async getAllPosts(req: Request, res: Response) {
    try {
      const posts: PostI[] = await Post.findAll({ where: { status: "ACTIVE" } });
      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ error: "Error fetching posts" });
    }
  }

  public async getPostById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const post = await Post.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (post) res.status(200).json({ post });
      else res.status(404).json({ error: "Post not found or inactive" });
    } catch (error) {
      res.status(500).json({ error: "Error fetching post" });
    }
  }

  public async createPost(req: Request, res: Response) {
    try {
      const { content, date, status, forumId, studentId } = req.body;
      const body: PostI = { content, date, status, forumId, studentId };
      const newPost = await Post.create(body as any);
      res.status(201).json(newPost);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updatePost(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const { content, date, status, forumId, studentId } = req.body;
      const body: PostI = { content, date, status, forumId, studentId };

      const postExist = await Post.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (postExist) {
        await postExist.update(body);
        res.status(200).json(postExist);
      } else res.status(404).json({ error: "Post not found or inactive" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id);
      if (post) {
        await post.destroy();
        res.status(200).json({ message: "Post deleted successfully" });
      } else res.status(404).json({ error: "Post not found" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting post" });
    }
  }

  public async deletePostAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const post = await Post.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (post) {
        await post.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Post marked as inactive" });
      } else res.status(404).json({ error: "Post not found" });
    } catch (error) {
      res.status(500).json({ error: "Error marking post as inactive" });
    }
  }
}
