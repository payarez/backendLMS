// controllers/module.controller.ts
import { Request, Response } from "express";
import { Module, ModuleI } from "../../models/academicManagment/Module";

export class ModuleController {

  public async getAllModules(req: Request, res: Response) {
    try {
      const modules: ModuleI[] = await Module.findAll({ where: { status: "ACTIVE" } });
      res.status(200).json( modules );
    } catch (error) {
      res.status(500).json({ error: "Error fetching modules" });
    }
  }

  public async getModuleById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const module = await Module.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (module) res.status(200).json({ module });
      else res.status(404).json({ error: "Module not found or inactive" });
    } catch (error) {
      res.status(500).json({ error: "Error fetching module" });
    }
  }

  public async createModule(req: Request, res: Response) {
    try {
      const { title, description, status, courseId } = req.body;
      const body: ModuleI = { title, description, status, courseId };
      const newModule = await Module.create(body as any);
      res.status(201).json(newModule);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateModule(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const { title, description, status, courseId } = req.body;
      const body: ModuleI = { title, description, status, courseId };

      const moduleExist = await Module.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (moduleExist) {
        await moduleExist.update(body);
        res.status(200).json(moduleExist);
      } else res.status(404).json({ error: "Module not found or inactive" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteModule(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const module = await Module.findByPk(id);
      if (module) {
        await module.destroy();
        res.status(200).json({ message: "Module deleted successfully" });
      } else res.status(404).json({ error: "Module not found" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting module" });
    }
  }

  public async deleteModuleAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const module = await Module.findOne({ where: { id: pk, status: "ACTIVE" } });
      if (module) {
        await module.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Module marked as inactive" });
      } else res.status(404).json({ error: "Module not found" });
    } catch (error) {
      res.status(500).json({ error: "Error marking module as inactive" });
    }
  }
}
