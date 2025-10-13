// models/Submission.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/db";
import { Lesson } from "../academicManagment/Lesson";
import { Student } from "../usersAndEnrrollment/Student";
import { Assessment } from "./Assessment";

export interface SubmissionI {
  id?: number;
  content: string;
  submittedAt: Date;
  status: "ACTIVE" | "INACTIVE";
  studentId: number;
  student?: Student;
  lessonId: number;
  lesson?: Lesson;
}

export class Submission extends Model {
  public id!: number;
  public content!: string;
  public submittedAt!: Date;
  public status!: "ACTIVE" | "INACTIVE";
  public studentId!: number;
  public student?: Student;
  public lessonId!: number;
  public lesson?: Lesson;
}

Submission.init(
  {
    content: { type: DataTypes.TEXT, allowNull: false },
    submittedAt: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  { sequelize, modelName: "Submission", tableName: "submissions", timestamps: false }
);

// Relations
Submission.belongsTo(Student, { foreignKey: "studentId", targetKey: "id" });
Student.hasMany(Submission, { foreignKey: "studentId", sourceKey: "id" });

Submission.belongsTo(Lesson, { foreignKey: "lessonId", targetKey: "id" });
Lesson.hasMany(Submission, { foreignKey: "lessonId", sourceKey: "id" });