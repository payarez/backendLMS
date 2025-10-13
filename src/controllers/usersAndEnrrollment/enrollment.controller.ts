// controllers/enrollment.controller.ts
import { Request, Response } from "express";
import { Enrollment, EnrollmentI } from "../../models/usersAndEnrrollment/Enrollment";

export class EnrollmentController {

  public async getAllEnrollments(req: Request, res: Response) {
    try {
      const enrollments: EnrollmentI[] = await Enrollment.findAll({ where: { status: "ACTIVE" } });
      res.status(200).json({ enrollments });
    } catch (error) {
      res.status(500).json({ error: "Error fetching enrollments" });
    }
  }

  public async getEnrollmentById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const enrollment = await Enrollment.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (enrollment) res.status(200).json({ enrollment });
      else res.status(404).json({ error: "Enrollment not found or inactive" });
    } catch (error) {
      res.status(500).json({ error: "Error fetching enrollment" });
    }
  }

  public async createEnrollment(req: Request, res: Response) {
    try {
      const { date, status, studentId, courseId } = req.body;
      const body: EnrollmentI = { date, status, studentId, courseId };
      const newEnrollment = await Enrollment.create(body as any);
      res.status(201).json(newEnrollment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateEnrollment(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const { date, status, studentId, courseId } = req.body;
      const body: EnrollmentI = { date, status, studentId, courseId };

      const enrollmentExist = await Enrollment.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (enrollmentExist) {
        await enrollmentExist.update(body);
        res.status(200).json(enrollmentExist);
      } else res.status(404).json({ error: "Enrollment not found or inactive" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteEnrollment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const enrollment = await Enrollment.findByPk(id);
      if (enrollment) {
        await enrollment.destroy();
        res.status(200).json({ message: "Enrollment deleted successfully" });
      } else res.status(404).json({ error: "Enrollment not found" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting enrollment" });
    }
  }

  public async deleteEnrollmentAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const enrollment = await Enrollment.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (enrollment) {
        await enrollment.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Enrollment marked as inactive" });
      } else res.status(404).json({ error: "Enrollment not found" });
    } catch (error) {
      res.status(500).json({ error: "Error marking enrollment as inactive" });
    }
  }
}
