// models/Course.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/db";
import { Module } from "./Module";
import { Enrollment } from "../usersAndEnrrollment/Enrollment";
import { Teacher } from "../usersAndEnrrollment/Teacher";
import { CourseTag } from "../forumsAndCommunity/CourseTag";

export interface CourseI {
  id?: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: "ACTIVE" | "INACTIVE";

  teacherId: number;
  teacher?: Teacher;

  modules?: Module[];
  enrollments?: Enrollment[];
  courseTags?: CourseTag[];
}

export class Course extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public startDate!: Date;
  public endDate!: Date;
  public status!: "ACTIVE" | "INACTIVE";

  public teacherId!: number;
  public teacher?: Teacher;
}

Course.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  { sequelize, modelName: "Course", tableName: "courses", timestamps: false }
);

// Relations
Course.belongsTo(Teacher, { foreignKey: "teacherId", targetKey: "id" });
Teacher.hasMany(Course, { foreignKey: "teacherId", sourceKey: "id" });

// Course.hasMany(Module, { foreignKey: "courseId", sourceKey: "id" });
// Module.belongsTo(Course, { foreignKey: "courseId", targetKey: "id" });

// Course.hasMany(Enrollment, { foreignKey: "courseId", sourceKey: "id" });
// Enrollment.belongsTo(Course, { foreignKey: "courseId", targetKey: "id" });

// Course.hasMany(CourseTag, { foreignKey: "courseId", sourceKey: "id" });
// CourseTag.belongsTo(Course, { foreignKey: "courseId", targetKey: "id" });