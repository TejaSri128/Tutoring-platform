import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { ReviewDbInterface } from '../../repositories/reviewDbRepository';
import { CourseDbRepositoryInterface } from '../../repositories/courseDbRepository';

export const rateCourseU = async (
  studentId: string,
  courseId: string,
  rating: number,
  reviewText: string,
  reviewDbRepository: ReturnType<ReviewDbInterface>,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  if (!studentId || !courseId || !rating || !reviewText) {
    throw new AppError('All fields (rating, reviewText) are required', HttpStatusCodes.BAD_REQUEST);
  }

  const course = await courseDbRepository.getCourseById(courseId);
  if (!course) {
    throw new AppError('Course not found', HttpStatusCodes.NOT_FOUND);
  }

  const isEnrolled = course.coursesEnrolled.some((id: any) => id.toString() === studentId);
  if (!isEnrolled) {
    throw new AppError('You must be enrolled in the course to rate it', HttpStatusCodes.FORBIDDEN);
  }

  return await reviewDbRepository.addReview(studentId, courseId, rating, reviewText);
};
