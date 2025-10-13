// controllers/teacher.controller.ts
import { Request, Response } from "express";
import { Teacher, TeacherI } from "../../models/usersAndEnrrollment/Teacher";

export class TeacherController {

  public async getAllTeachers(req: Request, res: Response) {
    try {
      const teachers: TeacherI[] = await Teacher.findAll({ where: { status: "ACTIVE" } });
      res.status(200).json({ teachers });
    } catch (error) {
      res.status(500).json({ error: "Error fetching teachers" });
    }
  }

  public async getTeacherById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const teacher = await Teacher.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (teacher) res.status(200).json({ teacher });
      else res.status(404).json({ error: "Teacher not found or inactive" });
    } catch (error) {
      res.status(500).json({ error: "Error fetching teacher" });
    }
  }

  public async createTeacher(req: Request, res: Response) {
    try {
      const { name, subject, email, phone, registration_date, status } = req.body;
      const body: TeacherI = { name, subject, email, phone, registration_date, status };
      const newTeacher = await Teacher.create(body as any);
      res.status(201).json(newTeacher);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateTeacher(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const { name, subject, email, phone, registration_date, status } = req.body;
      const body: TeacherI = { name, subject, email, phone, registration_date, status };

      const teacherExist = await Teacher.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (teacherExist) {
        await teacherExist.update(body);
        res.status(200).json(teacherExist);
      } else res.status(404).json({ error: "Teacher not found or inactive" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteTeacher(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const teacher = await Teacher.findByPk(id);
      if (teacher) {
        await teacher.destroy();
        res.status(200).json({ message: "Teacher deleted successfully" });
      } else res.status(404).json({ error: "Teacher not found" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting teacher" });
    }
  }

  public async deleteTeacherAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const teacher = await Teacher.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (teacher) {
        await teacher.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Teacher marked as inactive" });
      } else res.status(404).json({ error: "Teacher not found" });
    } catch (error) {
      res.status(500).json({ error: "Error marking teacher as inactive" });
    }
  }
}
