// routes/index.ts
import { Router } from "express";

// Academic Management
import { CourseRoutes } from "../routes/academicManagment/course";
import { ModuleRoutes } from "../routes/academicManagment/module";
import { LessonRoutes } from "../routes/academicManagment/lesson";

// Academic Activities
import { AssessmentRoutes } from "../routes/academicActivities/assessment";
import { AttemptRoutes } from "../routes/academicActivities/attempt";
import { SubmissionRoutes } from "../routes/academicActivities/submission";

// Users & Enrollment
import { StudentRoutes } from "../routes/usersAndEnrollment/student";
import { TeacherRoutes } from "../routes/usersAndEnrollment/teacher";
import { EnrollmentRoutes } from "../routes/usersAndEnrollment/enrollment";

// Community
import { TagRoutes } from "../routes/forumsAndCommunity/tag";
import { CourseTagRoutes } from "../routes/forumsAndCommunity/courseTag";
import { ForumRoutes } from "../routes/forumsAndCommunity/forum";
import { PostRoutes } from "../routes/forumsAndCommunity/post";

// Authentication
import { RefreshTokenRoutes } from "./authorization/refresh_token";
import { ResourceRoutes } from "./authorization/resource";
import { ResourceRoleRoutes } from "./authorization/resourceRole";
import { RoleRoutes } from "./authorization/role";
import { RoleUserRoutes } from "./authorization/role_user";
import { UserRoutes } from "./authorization/user";

import { AuthRoutes } from "./authorization/auth"; // Add this import

export class Routes {
  // Academic Management
  public courseRoutes: CourseRoutes = new CourseRoutes();
  public moduleRoutes: ModuleRoutes = new ModuleRoutes();
  public lessonRoutes: LessonRoutes = new LessonRoutes();

  // Academic Activities
  public assessmentRoutes: AssessmentRoutes = new AssessmentRoutes();
  public attemptRoutes: AttemptRoutes = new AttemptRoutes();
  public submissionRoutes: SubmissionRoutes = new SubmissionRoutes();

  // Users & Enrollment
  public studentRoutes: StudentRoutes = new StudentRoutes();
  public teacherRoutes: TeacherRoutes = new TeacherRoutes();
  public enrollmentRoutes: EnrollmentRoutes = new EnrollmentRoutes();

  // Community
  public tagRoutes: TagRoutes = new TagRoutes();
  public courseTagRoutes: CourseTagRoutes = new CourseTagRoutes();
  public forumRoutes: ForumRoutes = new ForumRoutes();
  public postRoutes: PostRoutes = new PostRoutes();

  // Authentication
  public userRoutes: UserRoutes = new UserRoutes();
  public roleRoutes: RoleRoutes = new RoleRoutes();
  public roleUserRoutes: RoleUserRoutes = new RoleUserRoutes();
  public refreshTokenRoutes: RefreshTokenRoutes = new RefreshTokenRoutes();
  public resourceRoutes: ResourceRoutes = new ResourceRoutes(); // Add ResourceRoutes
  public resourceRoleRoutes: ResourceRoleRoutes = new ResourceRoleRoutes(); // Add ResourceRoutes

  public authRoutes: AuthRoutes = new AuthRoutes(); // Add this line
}
