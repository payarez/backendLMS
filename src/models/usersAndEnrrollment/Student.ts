// models/Student.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/db";
import { Enrollment } from "./Enrollment";
import { Post } from "../forumsAndCommunity/Post";

export interface StudentI {
  id?: number;
  name: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";

  enrollments?: Enrollment[];
  posts?: Post[];
}

export class Student extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public status!: "ACTIVE" | "INACTIVE";

  public enrollments?: Enrollment[];
  public posts?: Post[];
}

Student.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: { msg: "Email must be valid" } } },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  {
    sequelize,
    modelName: "Student",
    tableName: "students",
    timestamps: false,
  }
);

// Relations
// Student.hasMany(Enrollment, { foreignKey: "studentId", sourceKey: "id" });
// Enrollment.belongsTo(Student, { foreignKey: "studentId", targetKey: "id" });

// Student.hasMany(Post, { foreignKey: "studentId", sourceKey: "id" });
// Post.belongsTo(Student, { foreignKey: "studentId", targetKey: "id" });
