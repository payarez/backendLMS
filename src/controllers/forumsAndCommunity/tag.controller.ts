// controllers/tag.controller.ts
import { Request, Response } from "express";
import { Tag, TagI } from "../../models/forumsAndCommunity/Tag";

export class TagController {

  public async getAllTags(req: Request, res: Response) {
    try {
      const tags: TagI[] = await Tag.findAll({ where: { status: "ACTIVE" } });
      res.status(200).json({ tags });
    } catch (error) {
      res.status(500).json({ error: "Error fetching tags" });
    }
  }

  public async getTagById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const tag = await Tag.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (tag) res.status(200).json({ tag });
      else res.status(404).json({ error: "Tag not found or inactive" });
    } catch (error) {
      res.status(500).json({ error: "Error fetching tag" });
    }
  }

  public async createTag(req: Request, res: Response) {
    try {
      const { name, status } = req.body;
      const body: TagI = { name, status };
      const newTag = await Tag.create(body as any);
      res.status(201).json(newTag);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateTag(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const { name, status } = req.body;
      const body: TagI = { name, status };

      const tagExist = await Tag.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (tagExist) {
        await tagExist.update(body);
        res.status(200).json(tagExist);
      } else res.status(404).json({ error: "Tag not found or inactive" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteTag(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const tag = await Tag.findByPk(id);
      if (tag) {
        await tag.destroy();
        res.status(200).json({ message: "Tag deleted successfully" });
      } else res.status(404).json({ error: "Tag not found" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting tag" });
    }
  }

  public async deleteTagAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const tag = await Tag.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (tag) {
        await tag.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Tag marked as inactive" });
      } else res.status(404).json({ error: "Tag not found" });
    } catch (error) {
      res.status(500).json({ error: "Error marking tag as inactive" });
    }
  }
}
