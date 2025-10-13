// models/Lesson.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/db";
import { Module } from "./Module";
import { Attempt } from "../academicActivities/Attempt";
import { Submission } from "../academicActivities/Submission";

export interface LessonI {
  id?: number;
  title: string;
  content: string;
  status: "ACTIVE" | "INACTIVE";

  moduleId: number;
  module?: Module;

  submissions?: Submission[];
  
  attempts?: Attempt[];
}

export class Lesson extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public status!: "ACTIVE" | "INACTIVE";

  public moduleId!: number;
  public module?: Module;
}

Lesson.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  { sequelize, modelName: "Lesson", tableName: "lessons", timestamps: false }
);

// Relations
Lesson.belongsTo(Module, { foreignKey: "moduleId", targetKey: "id" });
Module.hasMany(Lesson, { foreignKey: "moduleId", sourceKey: "id" });

