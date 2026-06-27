import mongoose, { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Students',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewText: {
    type: String,
    required: true,
    minlength: 2
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review = model('Review', reviewSchema, 'reviews');
export default Review;
