import { faker } from '@faker-js/faker';
import { Module } from '../models/academicManagment/Module';
import { Assessment } from '../models/academicActivities/Assessment';
import { Attempt } from '../models/academicActivities/Attempt';
import { Submission } from '../models/academicActivities/Submission';
import { Course } from '../models/academicManagment/Course';
import { Lesson } from '../models/academicManagment/Lesson';
import { CourseTag } from '../models/forumsAndCommunity/CourseTag';
import { Forum } from '../models/forumsAndCommunity/Forum';
import { Post } from '../models/forumsAndCommunity/Post';
import { Tag } from '../models/forumsAndCommunity/Tag';
import { Enrollment } from '../models/usersAndEnrrollment/Enrollment';
import { Student } from '../models/usersAndEnrrollment/Student';
import { Teacher } from '../models/usersAndEnrrollment/Teacher';

async function createFakeData() {
    // ==========================
    // 1. Datos independientes
    // ==========================

    // Crear teachers
    for (let i = 0; i < 10; i++) {
        await Teacher.create({
            name: faker.person.fullName(),
            subject: faker.helpers.arrayElement(['Matemáticas','Física','Programación','Historia','Biología']),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            registration_date: faker.date.past(),
            status: 'ACTIVE'
        });
    }

    // Crear students
    for (let i = 0; i < 30; i++) {
        await Student.create({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            status: 'ACTIVE'
        });
    }

    // Crear tags
    for (let i = 0; i < 10; i++) {
        await Tag.create({
            name: faker.commerce.department(),
            status: 'ACTIVE'
        });
    }

    // ==========================
    // 2. Datos dependientes de Teacher
    // ==========================

    const teachers = await Teacher.findAll();

    // Crear courses
    for (let i = 0; i < 10; i++) {
        await Course.create({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            startDate: faker.date.future(),
            endDate: faker.date.future({refDate: new Date(), years: 1}),
            status: 'ACTIVE',
            teacherId: teachers[faker.number.int({ min: 0, max: teachers.length - 1 })]?.id
        });
    }

    const courses = await Course.findAll();

    // ==========================
    // 3. Datos dependientes de Course
    // ==========================

    // Crear modules
    for (const course of courses) {
        for (let i = 0; i < 3; i++) {
            await Module.create({
                title: `${faker.commerce.productAdjective()} Module`,
                description: faker.commerce.productDescription(),
                status: 'ACTIVE',
                courseId: course.id!
            });
        }
    }

    const modules = await Module.findAll();

    // Crear course-tags
    const tags = await Tag.findAll();
    for (const course of courses) {
        for (let i = 0; i < 2; i++) {
            await CourseTag.create({
                courseId: course.id!,
                tagId: tags[faker.number.int({ min: 0, max: tags.length - 1 })]?.id!,
                status: 'ACTIVE'
            });
        }
    }

    // Crear lessons
    for (const module of modules) {
        for (let i = 0; i < 5; i++) {
            await Lesson.create({
                title: faker.commerce.productName(),
                content: faker.lorem.paragraphs(2),
                status: 'ACTIVE',
                moduleId: module.id!
            });
        }
    }

    const lessons = await Lesson.findAll();
    const students = await Student.findAll();

    // ==========================
    // 4. Datos dependientes de Lesson y Student
    // ==========================

    // Crear submissions
    for (const lesson of lessons) {
        for (let i = 0; i < 3; i++) {
            await Submission.create({
                content: faker.lorem.sentence(),
                submittedAt: faker.date.recent(),
                status: 'ACTIVE',
                lessonId: lesson.id!,
                studentId: students[faker.number.int({ min: 0, max: students.length - 1 })]?.id!
            });
        }
    }

    const submissions = await Submission.findAll();

    // Crear attempts
    for (const lesson of lessons) {
        for (let i = 0; i < 2; i++) {
            await Attempt.create({
                attemptNumber: i + 1,
                date: faker.date.recent(),
                result: faker.lorem.sentence(),
                status: 'ACTIVE',
                lessonId: lesson.id!
            });
        }
    }

    // Crear assessments
    for (const submission of submissions) {
        for (let i = 0; i < 1; i++) {
            await Assessment.create({
                grade: faker.number.int({ min: 50, max: 100 }),
                feedback: faker.lorem.sentence(),
                date: faker.date.recent(),
                status: 'ACTIVE',
                submissionId: submission.id!
            });
        }
    }

    // Crear enrollments
    for (const student of students) {
        for (let i = 0; i < 2; i++) {
            await Enrollment.create({
                date: faker.date.recent(),
                status: 'ACTIVE',
                studentId: student.id!,
                courseId: courses[faker.number.int({ min: 0, max: courses.length - 1 })]?.id!
            });
        }
    }

    // Crear forums
    for (const course of courses) {
        for (let i = 0; i < 2; i++) {
            await Forum.create({
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                status: 'ACTIVE',
                courseId: course.id!
            });
        }
    }

    const forums = await Forum.findAll();

    // Crear posts
    for (const forum of forums) {
        for (let i = 0; i < 5; i++) {
            await Post.create({
                content: faker.lorem.sentence(),
                date: faker.date.recent(),
                status: 'ACTIVE',
                forumId: forum.id!,
                studentId: students[faker.number.int({ min: 0, max: students.length - 1 })]?.id!
            });
        }
    }

    console.log('Datos falsos creados exitosamente');
}

createFakeData().catch((err) => console.error('Error al crear datos falsos:', err));
