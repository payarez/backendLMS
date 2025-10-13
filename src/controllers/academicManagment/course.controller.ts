// controllers/course.controller.ts
import { Request, Response } from "express";
import { Course, CourseI } from "../../models/academicManagment/Course";

export class CourseController {

  public async getAllCourses(req: Request, res: Response) {
    try {
      const courses: CourseI[] = await Course.findAll({ where: { status: "ACTIVE" } });
      res.status(200).json({ courses });
    } catch (error) {
      res.status(500).json({ error: "Error fetching courses" });
    }
  }

  public async getCourseById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const course = await Course.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (course) res.status(200).json({ course });
      else res.status(404).json({ error: "Course not found or inactive" });
    } catch (error) {
      res.status(500).json({ error: "Error fetching course" });
    }
  }

  public async createCourse(req: Request, res: Response) {
    try {
      const { title, description, startDate, endDate, status, teacherId } = req.body;
      const body: CourseI = { title, description, startDate, endDate, status, teacherId };
      const newCourse = await Course.create(body as any);
      res.status(201).json(newCourse);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateCourse(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const { title, description, startDate, endDate, status, teacherId } = req.body;
      const body: CourseI = { title, description, startDate, endDate, status, teacherId };

      const courseExist = await Course.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (courseExist) {
        await courseExist.update(body);
        res.status(200).json(courseExist);
      } else res.status(404).json({ error: "Course not found or inactive" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteCourse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id);
      if (course) {
        await course.destroy();
        res.status(200).json({ message: "Course deleted successfully" });
      } else res.status(404).json({ error: "Course not found" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting course" });
    }
  }

  public async deleteCourseAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const course = await Course.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (course) {
        await course.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Course marked as inactive" });
      } else res.status(404).json({ error: "Course not found" });
    } catch (error) {
      res.status(500).json({ error: "Error marking course as inactive" });
    }
  }
}
