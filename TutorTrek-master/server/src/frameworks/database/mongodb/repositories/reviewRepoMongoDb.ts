import Review from '../models/review';
import Course from '../models/course';
import mongoose from 'mongoose';

export const reviewRepositoryMongoDB = () => {
  const addReview = async (studentId: string, courseId: string, rating: number, reviewText: string) => {
    const newReview = new Review({
      studentId: new mongoose.Types.ObjectId(studentId),
      courseId: new mongoose.Types.ObjectId(courseId),
      rating,
      reviewText
    });
    const savedReview = await newReview.save();

    // Recalculate average rating for the course
    const stats = await Review.aggregate([
      { $match: { courseId: new mongoose.Types.ObjectId(courseId) } },
      { $group: { _id: '$courseId', avgRating: { $avg: '$rating' } } }
    ]);

    if (stats.length > 0) {
      await Course.updateOne(
        { _id: new mongoose.Types.ObjectId(courseId) },
        { rating: Math.round(stats[0].avgRating * 10) / 10 } // Round to 1 decimal place
      );
    }

    return savedReview;
  };

  const getReviewsByCourseId = async (courseId: string) => {
    return await Review.find({ courseId: new mongoose.Types.ObjectId(courseId) })
      .populate('studentId', 'firstName lastName profilePic')
      .sort({ createdAt: -1 });
  };

  return {
    addReview,
    getReviewsByCourseId
  };
};

export type ReviewRepositoryMongoDB = typeof reviewRepositoryMongoDB;
