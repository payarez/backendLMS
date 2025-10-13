// models/Attempt.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/db";
import { Lesson } from "../academicManagment/Lesson";

export interface AttemptI {
  id?: number;
  attemptNumber: number;
  date: Date;
  result?: string;
  status: "ACTIVE" | "INACTIVE";
  lessonId: number;
  lesson?: Lesson;
}

export class Attempt extends Model {
  public id!: number;
  public attemptNumber!: number;
  public date!: Date;
  public result?: string;
  public status!: "ACTIVE" | "INACTIVE";

  public lessonId!: number;
  public lesson?: Lesson;
}

Attempt.init(
  {
    attemptNumber: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    result: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  {
    sequelize,
    modelName: "Attempt",
    tableName: "attempts",
    timestamps: false,
  }
);

// Relations
Lesson.hasMany(Attempt, { foreignKey: "lessonId", sourceKey: "id" });
Attempt.belongsTo(Lesson, { foreignKey: "lessonId", targetKey: "id" });