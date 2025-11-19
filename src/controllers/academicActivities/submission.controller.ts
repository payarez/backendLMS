// controllers/submission.controller.ts
import { Request, Response } from "express";
import { Submission, SubmissionI } from "../../models/academicActivities/Submission";

export class SubmissionController {

  public async getAllSubmissions(req: Request, res: Response) {
    try {
      const submissions: SubmissionI[] = await Submission.findAll({ where: { status: "ACTIVE" } });
      res.status(200).json( submissions );
    } catch (error) {
      res.status(500).json({ error: "Error fetching submissions" });
    }
  }

  public async getSubmissionById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const submission = await Submission.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (submission) res.status(200).json({ submission });
      else res.status(404).json({ error: "Submission not found or inactive" });
    } catch (error) {
      res.status(500).json({ error: "Error fetching submission" });
    }
  }

  public async createSubmission(req: Request, res: Response) {
    try {
      const { content, submittedAt, status, studentId, lessonId } = req.body;
      const body: SubmissionI = { content, submittedAt, status, studentId, lessonId };
      const newSubmission = await Submission.create(body as any);
      res.status(201).json(newSubmission);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateSubmission(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const { content, submittedAt, status, studentId, lessonId } = req.body;
      const body: SubmissionI = { content, submittedAt, status, studentId, lessonId };

      const submissionExist = await Submission.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (submissionExist) {
        await submissionExist.update(body);
        res.status(200).json(submissionExist);
      } else res.status(404).json({ error: "Submission not found or inactive" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteSubmission(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const submission = await Submission.findByPk(id);
      if (submission) {
        await submission.destroy();
        res.status(200).json({ message: "Submission deleted successfully" });
      } else res.status(404).json({ error: "Submission not found" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting submission" });
    }
  }

  public async deleteSubmissionAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const submission = await Submission.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (submission) {
        await submission.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Submission marked as inactive" });
      } else res.status(404).json({ error: "Submission not found" });
    } catch (error) {
      res.status(500).json({ error: "Error marking submission as inactive" });
    }
  }
}
