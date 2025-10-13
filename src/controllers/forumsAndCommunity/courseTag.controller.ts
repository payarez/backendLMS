// controllers/courseTag.controller.ts
import { Request, Response } from "express";
import { CourseTag, CourseTagI } from "../../models/forumsAndCommunity/CourseTag";

export class CourseTagController {

  public async getAllCourseTags(req: Request, res: Response) {
    try {
      const courseTags: CourseTagI[] = await CourseTag.findAll({ where: { status: "ACTIVE" } });
      res.status(200).json({ courseTags });
    } catch (error) {
      res.status(500).json({ error: "Error fetching course tags" });
    }
  }

  public async getCourseTagById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const courseTag = await CourseTag.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (courseTag) res.status(200).json({ courseTag });
      else res.status(404).json({ error: "CourseTag not found or inactive" });
    } catch (error) {
      res.status(500).json({ error: "Error fetching course tag" });
    }
  }

  public async createCourseTag(req: Request, res: Response) {
    try {
      const { courseId, tagId, status } = req.body;
      const body: CourseTagI = { courseId, tagId, status };
      const newCourseTag = await CourseTag.create(body as any);
      res.status(201).json(newCourseTag);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateCourseTag(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const { courseId, tagId, status } = req.body;
      const body: CourseTagI = { courseId, tagId, status };

      const courseTagExist = await CourseTag.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (courseTagExist) {
        await courseTagExist.update(body);
        res.status(200).json(courseTagExist);
      } else res.status(404).json({ error: "CourseTag not found or inactive" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteCourseTag(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const courseTag = await CourseTag.findByPk(id);
      if (courseTag) {
        await courseTag.destroy();
        res.status(200).json({ message: "CourseTag deleted successfully" });
      } else res.status(404).json({ error: "CourseTag not found" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting course tag" });
    }
  }

  public async deleteCourseTagAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const courseTag = await CourseTag.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (courseTag) {
        await courseTag.update({ status: "INACTIVE" });
        res.status(200).json({ message: "CourseTag marked as inactive" });
      } else res.status(404).json({ error: "CourseTag not found" });
    } catch (error) {
      res.status(500).json({ error: "Error marking course tag as inactive" });
    }
  }
}
