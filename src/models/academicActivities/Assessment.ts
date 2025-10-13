// models/Assessment.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/db";
import { Submission } from "./Submission";

export interface AssessmentI {
  id?: number;
  grade: number;
  feedback?: string;
  date: Date;
  status: "ACTIVE" | "INACTIVE";
  submissionId: number;
  submission?: Submission;
}

export class Assessment extends Model {
  public id!: number;
  public grade!: number;
  public feedback?: string;
  public date!: Date;
  public status!: "ACTIVE" | "INACTIVE";
  public submissionId!: number;
  public submission?: Submission;
}

Assessment.init(
  {
    grade: { type: DataTypes.FLOAT, allowNull: false },
    feedback: { type: DataTypes.STRING, allowNull: true },
    date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  { sequelize, modelName: "Assessment", tableName: "assessments", timestamps: false }
);

// Relations
Assessment.belongsTo(Submission, { foreignKey: "submissionId", targetKey: "id" });
Submission.hasMany(Assessment, { foreignKey: "submissionId", sourceKey: "id" });