import React, { useState, useEffect } from "react";
import Carousel from "../../elements/carousel-page";
import TrendingCard from "../home/trending-card";
import RecommendedCard from "../home/recommended-card";
import { ApiResponseRecommended } from "../../../api/types/apiResponses/api-response-home-page-listing";
import TrendingCardShimmer from "components/shimmer/shimmer-trending-course";
import { selectIsLoggedIn } from "../../../redux/reducers/authSlice";
import { useSelector } from "react-redux";
import {
  getTrendingCourses,
  getRecommendedCourses,
} from "../../../api/endpoints/course/course";
import { ApiResponseTrending } from "../../../api/types/apiResponses/api-response-home-page-listing";
import { Link } from "react-router-dom";
import { selectUserType } from "../../../redux/reducers/authSlice";

const StudentHomePage: React.FC = () => {
  const [trendingCourses, setTrendingCourses] = useState<
    ApiResponseTrending[] | null
  >(null);
  const [recommendedCourses, setRecommendedCourses] = useState<
    ApiResponseRecommended[] | null
  >(null);
  const [showMoreTrending, setShowMoreTrending] = useState(false);
  const [showMoreRecommended, setShowMoreRecommended] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(6);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);
  const [isLoadingRecommended, selectIsLoadingRecommended] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUserType);

  const fetchTrendingCourses = async () => {
    try {
      setIsLoadingTrending(true);
      const response = await getTrendingCourses();
      setTrendingCourses(response.data);
      setTimeout(() => {
        setIsLoadingTrending(false);
      }, 1000);
    } catch (error) {
      setIsLoadingTrending(false);
    }
  };

  const fetchRecommendedCourses = async () => {
    try {
      selectIsLoadingRecommended(true);
      const response = await getRecommendedCourses();
      setRecommendedCourses(response.data);
      setTimeout(() => {
        selectIsLoadingRecommended(false);
      }, 1000);
    } catch (error) {
      selectIsLoadingRecommended(false);
    }
  };

  useEffect(() => {
    fetchTrendingCourses();
    isLoggedIn && user === "student" && fetchRecommendedCourses();
  }, []);

  const handleShowMoreTrending = () => {
    setShowMoreTrending(true);
    setCardsToShow((prevCardsToShow) => prevCardsToShow + 3);
  };

  const handleShowMoreRecommended = () => {
    setShowMoreRecommended(true);
    setCardsToShow((prevCardsToShow) => prevCardsToShow + 3);
  };

  if (isLoadingTrending || isLoadingRecommended) {
    return (
      <div className="bg-[#090d16] min-h-screen text-slate-100">
        <Carousel />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 border-b border-slate-900 pb-4">
            <div className="h-8 w-64 bg-slate-900 rounded-lg animate-pulse" />
            <div className="mt-2 h-4 w-96 bg-slate-900 rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {Array.from({ length: 3 }).map((_, index) => (
              <TrendingCardShimmer key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#090d16] min-h-screen text-slate-100 relative overflow-hidden pb-16">
      {/* Background neon blurs */}
      <div className="absolute top-[30rem] -left-20 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[65rem] -right-20 w-[35rem] h-[35rem] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Slider Carousel */}
      <Carousel />

      {/* Trending Courses Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-slate-900 pb-6">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Trending Courses
            </h2>
            <p className="mt-2 text-sm text-slate-400 font-light">
              Accelerate your engineering credentials with our most enrolled backend and frontend courses.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {trendingCourses?.slice(0, cardsToShow).map((course) => (
            <Link 
              key={course._id} 
              to={`/courses/${course._id}`}
              className="block transition-transform duration-300 hover:-translate-y-2 h-full w-full max-w-[22rem]"
            >
              <TrendingCard courseInfo={course} />
            </Link>
          ))}
        </div>

        {trendingCourses && trendingCourses.length > cardsToShow && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleShowMoreTrending}
              className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-200"
            >
              View More Courses
            </button>
          </div>
        )}
      </div>

      {/* Recommended Courses Section */}
      {recommendedCourses && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-slate-900 pb-6">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Recommended for You
              </h2>
              <p className="mt-2 text-sm text-slate-400 font-light">
                Tailored architectures and tech guides picked based on your interest domains.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {recommendedCourses?.slice(0, cardsToShow).map((course) => (
              <Link 
                key={course._id} 
                to={`/courses/${course._id}`}
                className="block transition-transform duration-300 hover:-translate-y-2 h-full w-full max-w-[22rem]"
              >
                <RecommendedCard courseInfo={course} />
              </Link>
            ))}
          </div>

          {!showMoreRecommended && recommendedCourses.length > cardsToShow && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={handleShowMoreRecommended}
                className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-200"
              >
                View More Recommendations
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentHomePage;
