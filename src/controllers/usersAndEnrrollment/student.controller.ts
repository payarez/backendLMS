// controllers/student.controller.ts
import { Request, Response } from "express";
import { Student, StudentI } from "../../models/usersAndEnrrollment/Student";

export class StudentController {

  public async getAllStudents(req: Request, res: Response) {
    try {
      const students: StudentI[] = await Student.findAll({ where: { status: "ACTIVE" } });
      res.status(200).json( students );
    } catch (error) {
      res.status(500).json({ error: "Error fetching students" });
    }
  }

  public async getStudentById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const student = await Student.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (student) res.status(200).json({ student });
      else res.status(404).json({ error: "Student not found or inactive" });
    } catch (error) {
      res.status(500).json({ error: "Error fetching student" });
    }
  }

  public async createStudent(req: Request, res: Response) {
    try {
      const { name, email, status } = req.body;
      const body: StudentI = { name, email, status };
      const newStudent = await Student.create(body as any);
      res.status(201).json(newStudent);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateStudent(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const { name, email, status } = req.body;
      const body: StudentI = { name, email, status };

      const studentExist = await Student.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (studentExist) {
        await studentExist.update(body);
        res.status(200).json(studentExist);
      } else res.status(404).json({ error: "Student not found or inactive" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteStudent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const student = await Student.findByPk(id);
      if (student) {
        await student.destroy();
        res.status(200).json({ message: "Student deleted successfully" });
      } else res.status(404).json({ error: "Student not found" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting student" });
    }
  }

  public async deleteStudentAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const student = await Student.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (student) {
        await student.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Student marked as inactive" });
      } else res.status(404).json({ error: "Student not found" });
    } catch (error) {
      res.status(500).json({ error: "Error marking student as inactive" });
    }
  }
}
