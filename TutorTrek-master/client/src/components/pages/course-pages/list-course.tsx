import React, { useEffect, useState } from "react";
import CourseCard from "./course-card";
import {
  getAllCourses,
  searchCourse,
} from "../../../api/endpoints/course/course";
import { toast } from "react-toastify";
import { CourseInterface } from "../../../types/course";
import { Link } from "react-router-dom";
import ShimmerCard from "../../shimmer/shimmer-card";
import { RiSearchLine } from "react-icons/ri";
import FilterCoursesSelectBox from "./filter-course-selectbox";
import { debounce } from "lodash";
import { MdSentimentDissatisfied } from "react-icons/md";

const ListCourse: React.FC = () => {
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterQuery, setFilterQuery] = useState<string>("");

  const fetchCourse = async () => {
    try {
      const courses = await getAllCourses();
      setCourses(courses?.data?.data || []);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    const debouncedHandleCourseSearch = debounce(async () => {
      if (searchQuery.trim() !== "") {
        try {  
          const response = await searchCourse(searchQuery, "");
          setCourses(response?.data?.data || response?.data);
        } catch (error) {
          toast.error("Failed to search course");
        }
      } else if (filterQuery.trim() !== "") {
        try {
          const response = await searchCourse("", filterQuery);
          setCourses(response?.data?.data || response?.data);
        } catch (error) { 
          toast.error("Failed to search course");
        }
      } else {
        fetchCourse();
      }
    }, 300);

    debouncedHandleCourseSearch();

    return () => {
      debouncedHandleCourseSearch.cancel();
    };
  }, [searchQuery, filterQuery]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSelect = (data: string) => {
    setFilterQuery(data);
  };

  if (isLoading) {
    return (
      <div className="bg-[#090d16] min-h-screen text-slate-100">
        <div className="bg-gradient-to-r from-[#090d16] via-slate-900 to-indigo-950 text-white py-14 px-6 border-b border-slate-900">
          <div className="max-w-6xl mx-auto space-y-3 animate-pulse">
            <div className="h-8 w-80 bg-slate-900 rounded-lg" />
            <div className="h-4 w-96 bg-slate-900 rounded-lg" />
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-6 justify-center">
            {[...Array(8)].map((_, index) => (
              <div className="m-2 bg-slate-900/50 rounded-2xl p-4 border border-slate-900/50" key={index}>
                <ShimmerCard />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#090d16] min-h-screen text-slate-100 pb-16 font-sans relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-80 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40rem] right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Page Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#090d16] via-slate-900 to-indigo-950 text-white py-14 px-6 border-b border-slate-900 shadow-inner">
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Explore Tech Courses
          </h1>
          <p className="mt-2 text-slate-400 text-sm md:text-base font-light">
            Choose from over {courses?.length} developer courses to acquire practical programming skills.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="max-w-6xl mx-auto px-4 mt-8 relative z-10">
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-900 shadow-lg shadow-black/20 backdrop-blur-md flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-1/3">
            <FilterCoursesSelectBox handleSelect={handleSelect} />
          </div>
          
          <div className="relative w-full md:w-1/2">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <RiSearchLine size={20} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-[#090d16]/80 text-slate-100 placeholder-slate-500"
              placeholder="Search by category, course name, or key..."
            />
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-6xl mx-auto px-4 mt-10 relative z-10">
        {courses.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {courses.map((course: CourseInterface) => (
              <Link 
                to={course._id} 
                key={course._id}
                className="block transition-transform duration-200 hover:-translate-y-1.5 h-full w-full max-w-[18.5rem]"
              >
                <CourseCard {...course} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/30 p-12 rounded-2xl border border-slate-900 text-center max-w-md mx-auto mt-12 backdrop-blur-sm">
            <MdSentimentDissatisfied
              className="mx-auto text-slate-600 mb-4"
              size={58}
            />
            <h3 className="text-slate-200 font-bold text-lg">No courses found</h3>
            <p className="text-slate-400 text-sm mt-2 font-light">
              We couldn't locate any matching tech courses. Try typing another search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCourse;
