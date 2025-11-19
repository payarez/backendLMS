// controllers/attempt.controller.ts
import { Request, Response } from "express";
import { Attempt, AttemptI } from "../../models/academicActivities/Attempt";

export class AttemptController {

  public async getAllAttempts(req: Request, res: Response) {
    try {
      const attempts: AttemptI[] = await Attempt.findAll({ where: { status: "ACTIVE" } });
      res.status(200).json( attempts );
    } catch (error) {
      res.status(500).json({ error: "Error fetching attempts" });
    }
  }

  public async getAttemptById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const attempt = await Attempt.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (attempt) res.status(200).json({ attempt });
      else res.status(404).json({ error: "Attempt not found or inactive" });
    } catch (error) {
      res.status(500).json({ error: "Error fetching attempt" });
    }
  }

  public async createAttempt(req: Request, res: Response) {
    try {
      const { attemptNumber, date, result, status, lessonId } = req.body;
      const body: AttemptI = { attemptNumber, date, result, status, lessonId };
      const newAttempt = await Attempt.create(body as any);
      res.status(201).json(newAttempt);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateAttempt(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const { attemptNumber, date, result, status, lessonId } = req.body;
      const body: AttemptI = { attemptNumber, date, result, status, lessonId };

      const attemptExist = await Attempt.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (attemptExist) {
        await attemptExist.update(body);
        res.status(200).json(attemptExist);
      } else res.status(404).json({ error: "Attempt not found or inactive" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteAttempt(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const attempt = await Attempt.findByPk(id);
      if (attempt) {
        await attempt.destroy();
        res.status(200).json({ message: "Attempt deleted successfully" });
      } else res.status(404).json({ error: "Attempt not found" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting attempt" });
    }
  }

  public async deleteAttemptAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const attempt = await Attempt.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (attempt) {
        await attempt.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Attempt marked as inactive" });
      } else res.status(404).json({ error: "Attempt not found" });
    } catch (error) {
      res.status(500).json({ error: "Error marking attempt as inactive" });
    }
  }
}
