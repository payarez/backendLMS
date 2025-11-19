// controllers/assessment.controller.ts
import { Request, Response } from "express";
import { Assessment, AssessmentI } from "../../models/academicActivities/Assessment";


export class AssessmentController {

  public async getAllAssessments(req: Request, res: Response) {
    try {
      const assessments: AssessmentI[] = await Assessment.findAll({ where: { status: "ACTIVE" } });
      res.status(200).json( assessments );
    } catch (error) {
      res.status(500).json({ error: "Error fetching assessments" });
    }
  }

  public async getAssessmentById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const assessment = await Assessment.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (assessment) res.status(200).json( assessment );
      else res.status(404).json({ error: "Assessment not found or inactive" });
    } catch (error) {
      res.status(500).json({ error: "Error fetching assessment" });
    }
  }

  public async createAssessment(req: Request, res: Response) {
    try {
      const { grade, feedback, date, status, submissionId } = req.body;
      const body: AssessmentI = { grade, feedback, date, status, submissionId };
      const newAssessment = await Assessment.create(body as any);
      res.status(201).json(newAssessment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateAssessment(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const { grade, feedback, date, status, submissionId } = req.body;
      const body: AssessmentI = { grade, feedback, date, status, submissionId };

      const assessmentExist = await Assessment.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (assessmentExist) {
        await assessmentExist.update(body);
        res.status(200).json(assessmentExist);
      } else res.status(404).json({ error: "Assessment not found or inactive" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteAssessment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const assessment = await Assessment.findByPk(id);
      if (assessment) {
        await assessment.destroy();
        res.status(200).json({ message: "Assessment deleted successfully" });
      } else res.status(404).json({ error: "Assessment not found" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting assessment" });
    }
  }

  public async deleteAssessmentAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const assessment = await Assessment.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (assessment) {
        await assessment.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Assessment marked as inactive" });
      } else res.status(404).json({ error: "Assessment not found" });
    } catch (error) {
      res.status(500).json({ error: "Error marking assessment as inactive" });
    }
  }
}
