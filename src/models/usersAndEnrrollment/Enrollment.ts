// models/Enrollment.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/db";
import { Student } from "./Student";
import { Course } from "../academicManagment/Course";

export interface EnrollmentI {
  id?: number;
  date: Date;
  status: "ACTIVE" | "INACTIVE";

  studentId: number;
  student?: Student;

  courseId: number;
  course?: Course;
}

export class Enrollment extends Model {
  public id!: number;
  public date!: Date;
  public status!: "ACTIVE" | "INACTIVE";

  public studentId!: number;
  public student?: Student;

  public courseId!: number;
  public course?: Course;
}

Enrollment.init(
  {
    date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  {
    sequelize,
    modelName: "Enrollment",
    tableName: "enrollments",
    timestamps: false,
  }
);

// Relations
Enrollment.belongsTo(Student, { foreignKey: "studentId", targetKey: "id" });
Student.hasMany(Enrollment, { foreignKey: "studentId", sourceKey: "id" });

Enrollment.belongsTo(Course, { foreignKey: "courseId", targetKey: "id" });
Course.hasMany(Enrollment, { foreignKey: "courseId", sourceKey: "id" });
