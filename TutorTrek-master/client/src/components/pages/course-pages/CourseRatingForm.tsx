import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { rateCourse } from "../../../api/endpoints/course/course";
import { toast } from "react-toastify";

interface Props {
  courseId: string;
  onReviewSubmitted: () => void;
}

const CourseRatingForm: React.FC<Props> = ({ courseId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      toast.error("Please enter your review text");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await rateCourse(courseId, rating, reviewText);
      toast.success(response?.message || "Thank you for your rating!");
      setReviewText("");
      onReviewSubmitted();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-white border-2 shadow-md rounded-lg p-6 my-6'>
      <h3 className='text-xl font-bold mb-4 text-blue-gray-800'>Rate this Course</h3>
      <form onSubmit={handleSubmit}>
        <div className='flex items-center mb-4'>
          <span className='mr-3 font-semibold text-gray-700'>Your Rating:</span>
          <div className='flex space-x-1'>
            {[1, 2, 3, 4, 5].map((star) => {
              const fillStar = hoverRating !== null ? star <= hoverRating : star <= rating;
              return (
                <button
                  type='button'
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className='focus:outline-none transition-colors duration-150'
                >
                  <FaStar
                    className={`text-2xl ${
                      fillStar ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
        <div className='mb-4'>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={3}
            placeholder='Write your feedback about this course...'
            className='w-full border border-gray-400 rounded-md p-3 focus:outline-none focus:border-blue-500 text-gray-700'
          />
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200 disabled:opacity-50'
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseRatingForm;
