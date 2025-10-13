// models/Post.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/db";
import { Forum } from "./Forum";
import { Student } from "../usersAndEnrrollment/Student";

export interface PostI {
  id?: number;
  content: string;
  date: Date;
  status: "ACTIVE" | "INACTIVE";

  forumId: number;
  forum?: Forum;

  studentId: number;
  student?: Student;
}

export class Post extends Model {
  public id!: number;
  public content!: string;
  public date!: Date;
  public status!: "ACTIVE" | "INACTIVE";

  public forumId!: number;
  public forum?: Forum;

  public studentId!: number;
  public student?: Student;
}

Post.init(
  {
    content: { type: DataTypes.TEXT, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "posts",
    timestamps: false,
  }
);

// Relations
Post.belongsTo(Forum, { foreignKey: "forumId", targetKey: "id" });
Forum.hasMany(Post, { foreignKey: "forumId", sourceKey: "id" });

Post.belongsTo(Student, { foreignKey: "studentId", targetKey: "id" });
Student.hasMany(Post, { foreignKey: "studentId", sourceKey: "id" });
