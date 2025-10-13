// models/Tag.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/db";
import { CourseTag } from "./CourseTag";

export interface TagI {
  id?: number;
  name: string;
  status: "ACTIVE" | "INACTIVE";

  courseTags?: CourseTag[];
}

export class Tag extends Model {
  public id!: number;
  public name!: string;
  public status!: "ACTIVE" | "INACTIVE";

  public courseTags?: CourseTag[];
}

Tag.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  {
    sequelize,
    modelName: "Tag",
    tableName: "tags",
    timestamps: false,
  }
);

// Relations
// Tag.hasMany(CourseTag, { foreignKey: "tagId", sourceKey: "id" });
// CourseTag.belongsTo(Tag, { foreignKey: "tagId", targetKey: "id" });
