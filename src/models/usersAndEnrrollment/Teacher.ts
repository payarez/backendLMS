// models/Teacher.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/db";
import { Course } from "../academicManagment/Course";

export interface TeacherI {
  id?: number;
  name: string;
  subject: string;
  email: string;
  phone: string;
  registration_date: Date;
  status: "ACTIVE" | "INACTIVE";
}

export class Teacher extends Model {
  public id!: number;
  public name!: string;
  public subject!: string;
  public email!: string;
  public phone!: string;
  public registration_date!: Date;
  public status!: "ACTIVE" | "INACTIVE";
}

Teacher.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    subject: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: { msg: "Email must be valid" } } },
    phone: { type: DataTypes.STRING, allowNull: true },
    registration_date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  {
    sequelize,
    modelName: "Teacher",
    tableName: "teachers",
    timestamps: false,
  }
);

// Relations
// Teacher.hasMany(Course, { foreignKey: "teacherId", sourceKey: "id" });
// Course.belongsTo(Teacher, { foreignKey: "teacherId", targetKey: "id" });
