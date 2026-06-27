import { ReviewRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/reviewRepoMongoDb';

export const reviewDbRepository = (
  repository: ReturnType<ReviewRepositoryMongoDB>
) => {
  const addReview = async (studentId: string, courseId: string, rating: number, reviewText: string) =>
    await repository.addReview(studentId, courseId, rating, reviewText);

  const getReviewsByCourseId = async (courseId: string) =>
    await repository.getReviewsByCourseId(courseId);

  return {
    addReview,
    getReviewsByCourseId
  };
};

export type ReviewDbInterface = typeof reviewDbRepository;
