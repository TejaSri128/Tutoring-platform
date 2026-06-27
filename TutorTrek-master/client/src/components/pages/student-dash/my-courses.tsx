import React, { useState, useEffect } from "react";
import MyCourseCard from "./my-course-card";
import { getCourseByStudent } from "../../../api/endpoints/course/course";
import { toast } from "react-toastify";
import { CourseInterface } from "../../../types/course";
import { Link } from "react-router-dom";
import ProfileCardShimmer from "../../shimmer/profile-card-shimmer";
type Props = {};

const MyCourses: React.FC = (props: Props) => {
  const [courses, setCourse] = useState<CourseInterface[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await getCourseByStudent();
      setCourse(response.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error: any) {
      setLoading(false);
      toast.success(error?.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className='w-full flex justify-center items-center py-6 bg-[#090d16] text-slate-100 font-sans'>
      <div className='w-11/12 '>
        <div>
          <div className='pt-5 pb-2 w-full border-b border-slate-900 mb-6'>
            <h2 className='text-3xl font-extrabold tracking-tight text-white'>
              Watch Courses
            </h2>
          </div>
          <div className='mb-4'>
            <h5 className='text-indigo-400 font-extrabold uppercase tracking-wider text-xs'>
              My Courses
            </h5>
          </div>
        </div>
        <div className='flex gap-x-10 h-full pb-10'>
          <div className='w-full h-full bg-transparent'>
            <div className='flex pt-8 pb-12 flex-wrap border border-slate-900 rounded-3xl items-center bg-slate-900/40 backdrop-blur-md justify-center gap-x-8 gap-y-8 shadow-2xl shadow-black/35 relative overflow-hidden'>
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => {
                  return <ProfileCardShimmer key={index} />;
                })
              ) : courses?.length ? (
                courses.map((course) => (
                  <Link to={`/courses/${course._id}`} key={course._id} className="block transition-transform duration-200">
                    <MyCourseCard {...course} />
                  </Link>
                ))
              ) : (
                <div className='text-center text-slate-400 font-light py-8 space-y-2 relative z-10'>
                  <p>You have not enrolled in any courses yet.</p>
                  <Link to='/courses' className='text-indigo-400 hover:text-indigo-300 font-medium underline transition-colors'>
                    Browse Available Courses
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
