// models/CourseTag.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/db";
import { Course } from "../academicManagment/Course";
import { Tag } from "./Tag";

export interface CourseTagI {
  id?: number;
  status: "ACTIVE" | "INACTIVE";

  courseId: number;
  course?: Course;

  tagId: number;
  tag?: Tag;
}

export class CourseTag extends Model {
  public id!: number;
  public status!: "ACTIVE" | "INACTIVE";

  public courseId!: number;
  public course?: Course;

  public tagId!: number;
  public tag?: Tag;
}

CourseTag.init(
  {
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  {
    sequelize,
    modelName: "CourseTag",
    tableName: "course_tags",
    timestamps: false,
  }
);

// Relations
CourseTag.belongsTo(Course, { foreignKey: "courseId", targetKey: "id" });
Course.hasMany(CourseTag, { foreignKey: "courseId", sourceKey: "id" });

CourseTag.belongsTo(Tag, { foreignKey: "tagId", targetKey: "id" });
Tag.hasMany(CourseTag, { foreignKey: "tagId", sourceKey: "id" });
