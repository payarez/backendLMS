// controllers/lesson.controller.ts
import { Request, Response } from "express";
import { Lesson, LessonI } from "../../models/academicManagment/Lesson";

export class LessonController {

  public async getAllLessons(req: Request, res: Response) {
    try {
      const lessons: LessonI[] = await Lesson.findAll({ where: { status: "ACTIVE" } });
      res.status(200).json( lessons );
    } catch (error) {
      res.status(500).json({ error: "Error fetching lessons" });
    }
  }

  public async getLessonById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const lesson = await Lesson.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (lesson) res.status(200).json( lesson );
      else res.status(404).json({ error: "Lesson not found or inactive" });
    } catch (error) {
      res.status(500).json({ error: "Error fetching lesson" });
    }
  }

  public async createLesson(req: Request, res: Response) {
    try {
      const { title, content, status, moduleId } = req.body;
      const body: LessonI = { title, content, status, moduleId };
      const newLesson = await Lesson.create(body as any);
      res.status(201).json(newLesson);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateLesson(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const { title, content, status, moduleId } = req.body;
      const body: LessonI = { title, content, status, moduleId };

      const lessonExist = await Lesson.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (lessonExist) {
        await lessonExist.update(body);
        res.status(200).json(lessonExist);
      } else res.status(404).json({ error: "Lesson not found or inactive" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteLesson(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const lesson = await Lesson.findByPk(id);
      if (lesson) {
        await lesson.destroy();
        res.status(200).json({ message: "Lesson deleted successfully" });
      } else res.status(404).json({ error: "Lesson not found" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting lesson" });
    }
  }

  public async deleteLessonAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const lesson = await Lesson.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (lesson) {
        await lesson.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Lesson marked as inactive" });
      } else res.status(404).json({ error: "Lesson not found" });
    } catch (error) {
      res.status(500).json({ error: "Error marking lesson as inactive" });
    }
  }
}
