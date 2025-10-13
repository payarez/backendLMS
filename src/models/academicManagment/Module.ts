// models/Module.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/db";
import { Course } from "./Course";
import { Lesson } from "./Lesson";

export interface ModuleI {
  id?: number;
  title: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";

  courseId: number;
  course?: Course;

  lessons?: Lesson[];
}

export class Module extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: "ACTIVE" | "INACTIVE";

  public courseId!: number;
  public course?: Course;
}

Module.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  { sequelize, modelName: "Module", tableName: "modules", timestamps: false }
);

// Relations
Module.belongsTo(Course, { foreignKey: "courseId", targetKey: "id" });
Course.hasMany(Module, { foreignKey: "courseId", sourceKey: "id" });

