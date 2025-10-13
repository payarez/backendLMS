// models/Forum.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/db";
import { Course } from "../academicManagment/Course";
import { Post } from "./Post";

export interface ForumI {
  id?: number;
  title: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";

  courseId: number;
  course?: Course;

  posts?: Post[];
}

export class Forum extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: "ACTIVE" | "INACTIVE";

  public courseId!: number;
  public course?: Course;

  public posts?: Post[];
}

Forum.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  {
    sequelize,
    modelName: "Forum",
    tableName: "forums",
    timestamps: false,
  }
);

// Relations
Forum.belongsTo(Course, { foreignKey: "courseId", targetKey: "id" });
Course.hasMany(Forum, { foreignKey: "courseId", sourceKey: "id" });

