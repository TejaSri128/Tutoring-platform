import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Student from './models/student';
import Instructor from './models/instructor';
import Course from './models/course';

export const seedDatabase = async () => {
  try {
    console.log('Seeding database with default instructors, courses, and student...');

    // Clear existing data to avoid collisions
    await Promise.all([
      Student.deleteMany({}),
      Instructor.deleteMany({}),
      Course.deleteMany({})
    ]);

    const hashedPassword = await bcrypt.hash('password123', 10);

    // 1. Seed Student
    const student = new Student({
      firstName: 'Test',
      lastName: 'Student',
      email: 'student@tutortrek.com',
      mobile: '9999999999',
      password: hashedPassword,
      interests: ['Web Development', 'System Architecture'],
      isGoogleUser: false,
      isBlocked: false,
      profilePic: {
        name: 'student_profile',
        url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
      }
    });
    const savedStudent = await student.save();
    console.log('Seeded Student: student@tutortrek.com / password123');

    // 2. Seed Instructors
    const instructor1 = new Instructor({
      firstName: 'Sarah',
      lastName: 'Connor',
      email: 'sarah.connor@tutortrek.com',
      qualification: 'Ph.D. in Computer Science',
      subjects: ['Web Development', 'React', 'TypeScript'],
      experience: '10 Years',
      skills: 'React, Node.js, MERN stack, Next.js',
      about: 'Passionate software engineer and educator with over a decade of teaching web technologies.',
      mobile: '1234567890',
      password: hashedPassword,
      isVerified: true,
      certificates: [{ name: 'PhD_Degree', key: 'phd_cert' }],
      profilePic: {
        name: 'sarah_profile',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150'
      }
    });
    const savedInstructor1 = await instructor1.save();
    console.log('Seeded Instructor: sarah.connor@tutortrek.com / password123');

    const instructor2 = new Instructor({
      firstName: 'Alex',
      lastName: 'Mercer',
      email: 'alex.mercer@tutortrek.com',
      qualification: 'M.S. in Software Engineering',
      subjects: ['System Architecture', 'Cloud Computing'],
      experience: '8 Years',
      skills: 'AWS, System Architecture, Docker, Kubernetes',
      about: 'Tech lead specializing in distributed systems and scaling application architectures.',
      mobile: '9876543210',
      password: hashedPassword,
      isVerified: true,
      certificates: [{ name: 'MS_Degree', key: 'ms_cert' }],
      profilePic: {
        name: 'alex_profile',
        url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=150'
      }
    });
    const savedInstructor2 = await instructor2.save();
    console.log('Seeded Instructor: alex.mercer@tutortrek.com / password123');

    // 3. Seed Courses
    const course1 = new Course({
      title: 'Mastering React & TypeScript',
      instructorId: savedInstructor1._id,
      duration: 8,
      category: 'Web Development',
      level: 'medium',
      tags: ['React', 'TypeScript', 'Frontend'],
      price: 999,
      isPaid: true,
      about: 'Learn to build production-ready single page applications using React, TypeScript, and clean coding principles.',
      description: 'This comprehensive course guides you from basic type annotations to advanced pattern designs in React & TypeScript.',
      syllabus: ['Introduction to TypeScript', 'React Component Typing', 'Advanced Hooks & Context', 'Testing and Deploying'],
      requirements: ['Basic HTML/JS knowledge', 'Familiarity with React basics'],
      thumbnail: {
        name: 'react_thumbnail',
        key: 'react_thumb_key',
        url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800'
      },
      guidelines: {
        name: 'guidelines',
        key: 'guidelines_key',
        url: 'https://tutortrek.online/guidelines.pdf'
      },
      introduction: {
        name: 'intro',
        key: 'intro_key',
        url: 'https://tutortrek.online/intro.mp4'
      },
      isVerified: true
    });
    await course1.save();
    console.log('Seeded Course: Mastering React & TypeScript');

    const course2 = new Course({
      title: 'System Design for Beginners',
      instructorId: savedInstructor2._id,
      duration: 6,
      category: 'System Architecture',
      level: 'hard',
      tags: ['System Design', 'Backend', 'Scale'],
      price: 1499,
      isPaid: true,
      about: 'Understand how large scale applications like Netflix, Uber, and Twitter work under the hood.',
      description: 'Learn load balancing, database replication, caching strategies, and system decomposition for high traffic applications.',
      syllabus: ['Introduction to System Design', 'Load Balancing & CDNs', 'Database Sharding', 'Case Studies: Designing Twitter'],
      requirements: ['Basic programming skills', 'Familiarity with REST APIs'],
      thumbnail: {
        name: 'sysdesign_thumbnail',
        key: 'sysdesign_thumb_key',
        url: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800'
      },
      guidelines: {
        name: 'guidelines',
        key: 'guidelines_key',
        url: 'https://tutortrek.online/guidelines.pdf'
      },
      introduction: {
        name: 'intro',
        key: 'intro_key',
        url: 'https://tutortrek.online/intro.mp4'
      },
      isVerified: true
    });
    await course2.save();
    console.log('Seeded Course: System Design for Beginners');

    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
