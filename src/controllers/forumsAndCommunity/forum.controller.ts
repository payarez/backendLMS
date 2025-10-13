// controllers/forum.controller.ts
import { Request, Response } from "express";
import { Forum, ForumI } from "../../models/forumsAndCommunity/Forum";

export class ForumController {

  public async getAllForums(req: Request, res: Response) {
    try {
      const forums: ForumI[] = await Forum.findAll({ where: { status: "ACTIVE" } });
      res.status(200).json({ forums });
    } catch (error) {
      res.status(500).json({ error: "Error fetching forums" });
    }
  }

  public async getForumById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const forum = await Forum.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (forum) res.status(200).json({ forum });
      else res.status(404).json({ error: "Forum not found or inactive" });
    } catch (error) {
      res.status(500).json({ error: "Error fetching forum" });
    }
  }

  public async createForum(req: Request, res: Response) {
    try {
      const { title, description, status, courseId } = req.body;
      const body: ForumI = { title, description, status, courseId };
      const newForum = await Forum.create(body as any);
      res.status(201).json(newForum);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateForum(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const { title, description, status, courseId } = req.body;
      const body: ForumI = { title, description, status, courseId };

      const forumExist = await Forum.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (forumExist) {
        await forumExist.update(body);
        res.status(200).json(forumExist);
      } else res.status(404).json({ error: "Forum not found or inactive" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteForum(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const forum = await Forum.findByPk(id);
      if (forum) {
        await forum.destroy();
        res.status(200).json({ message: "Forum deleted successfully" });
      } else res.status(404).json({ error: "Forum not found" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting forum" });
    }
  }

  public async deleteForumAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const forum = await Forum.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (forum) {
        await forum.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Forum marked as inactive" });
      } else res.status(404).json({ error: "Forum not found" });
    } catch (error) {
      res.status(500).json({ error: "Error marking forum as inactive" });
    }
  }
}
