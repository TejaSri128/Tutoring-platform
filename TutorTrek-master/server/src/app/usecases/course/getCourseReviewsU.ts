import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { ReviewDbInterface } from '../../repositories/reviewDbRepository';

export const getCourseReviewsU = async (
  courseId: string,
  reviewDbRepository: ReturnType<ReviewDbInterface>
) => {
  if (!courseId) {
    throw new AppError('Course ID is required', HttpStatusCodes.BAD_REQUEST);
  }
  return await reviewDbRepository.getReviewsByCourseId(courseId);
};
