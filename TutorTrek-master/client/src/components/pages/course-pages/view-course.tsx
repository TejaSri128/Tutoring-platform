import React, { useState, useEffect } from "react";
import CustomBreadCrumbs from "../../common/bread-crumbs";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { getIndividualCourse, getCourseReviews } from "../../../api/endpoints/course/course";
import { useParams } from "react-router-dom";
import CourseRatingForm from "./CourseRatingForm";
import { FaStar, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { toast } from "react-toastify";
import { CourseInterface } from "../../../types/course";
import { BiVideo } from "react-icons/bi";
import { IoBookSharp } from "react-icons/io5";
import useApiData from "../../../hooks/useApiCall";
import { getLessonsByCourse } from "../../../api/endpoints/course/lesson";
import { useDispatch } from "react-redux";
import { setCourse } from "../../../redux/reducers/courseSlice";
import { useSelector } from "react-redux";
import { selectStudentId } from "../../../redux/reducers/studentSlice";
import { MdDone } from "react-icons/md";
import PaymentConfirmationModal from "./payment-confirmation-modal";
import { selectIsLoggedIn } from "../../../redux/reducers/authSlice";
import LoginConfirmation from "../../common/login-confirmation-modal";
import PdfViewer from "./pdf-viewer";
import ViewCourseShimmer from "components/shimmer/view-course-shimmer";

const ViewCourseStudent: React.FC = () => {
  const params = useParams();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const courseId: string | undefined = params.courseId;
  const [openPaymentConfirmation, setOpenPaymentConfirmation] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const studentId = useSelector(selectStudentId);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [loginConfirmation, setLoginConfirmation] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [successToastShown, setSuccessToastShown] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  const fetchReviews = async (cid: string) => {
    try {
      const response = await getCourseReviews(cid);
      setReviews(response?.data || []);
    } catch (error) {
      console.error("Failed to fetch course reviews:", error);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchReviews(courseId);
    }
  }, [courseId]);

  const fetchCourse = async (courseId: string): Promise<CourseInterface> => {
    try {
      const course = await getIndividualCourse(courseId);
      return course?.data?.data as CourseInterface;
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to load course details", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      throw error;
    }
  };



  const fetchLessons = async (courseId: string) => {
    try {
      const lessons = await getLessonsByCourse(courseId);
      return lessons.data;
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to load lessons", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      throw error;
    }
  };

  const { data, isLoading, refreshData } = useApiData(fetchCourse, courseId);
  const { data: lessons, isLoading: isLessonsLoading } = useApiData(
    fetchLessons,
    courseId
  );

  const course: CourseInterface | null = data;
  useEffect(() => {
    if (course) {
      dispatch(setCourse({ course }));
    }
  }, [course, dispatch]);

  const handleToggle = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const handleEnroll = () => {
    if (!isLoggedIn) {
      setLoginConfirmation(true);
    } else {
      setOpenPaymentConfirmation(true);
    }
  };

  const location = useLocation();

  if (isLoading || isLessonsLoading) {
    return <ViewCourseShimmer />;
  }

  if (location.hash === "#success" && !successToastShown) {
    toast.success("Successfully enrolled into the course", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    setSuccessToastShown(true);
  }

  const enrolled = course?.coursesEnrolled.includes(studentId ?? "");

  return (
    <div className='bg-[#090d16] min-h-screen text-slate-100 font-sans pb-20 relative overflow-hidden'>
      {/* Background blurs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />

      <LoginConfirmation
        confirm={loginConfirmation}
        setConfirm={setLoginConfirmation}
      />
      <PaymentConfirmationModal
        open={openPaymentConfirmation}
        setUpdated={refreshData}
        courseDetails={{
          title: course?.title,
          price: 0,
          overview: course?.description ?? "",
          isPaid: false,
        }}
        setOpen={setOpenPaymentConfirmation}
      />

      <div className='max-w-4xl mx-auto px-4 pt-6 relative z-10'>
        <div className='mb-6'>
          <CustomBreadCrumbs paths={location.pathname} />
        </div>

        <div className='bg-slate-900/30 rounded-3xl border border-slate-900 shadow-xl overflow-hidden backdrop-blur-md'>
          {/* Thumbnail Header */}
          <div className='relative h-80 w-full overflow-hidden bg-[#06090f] border-b border-slate-950/40'>
            <img
              className='w-full h-full object-cover opacity-80'
              src={course?.thumbnailUrl}
              alt={course?.title || 'Course Thumbnail'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            <div className='absolute top-4 right-4 bg-indigo-500/90 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border border-indigo-400/30 shadow-lg shadow-indigo-500/10'>
              Bestseller
            </div>
          </div>

          <div className='p-6 md:p-8 space-y-8'>
            {/* Title Block */}
            <div className="space-y-4">
              <h2 className='text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight'>
                {course?.title}
              </h2>
              
              {course?.rating && course.rating > 0 ? (
                <div className="flex items-center space-x-2">
                  <div className="flex text-amber-400 space-x-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} className={i < Math.round(course.rating) ? "text-amber-400" : "text-slate-700"} />
                    ))}
                  </div>
                  <span className="text-slate-400 font-bold text-sm">{course.rating.toFixed(1)} / 5</span>
                </div>
              ) : null}
              
              <p className='text-slate-300 text-base md:text-lg font-light leading-relaxed break-words'>
                {course?.description}
              </p>
            </div>

            {/* Quick Metadata Stats Grid */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-[#090d16]/75 rounded-2xl border border-slate-800/40'>
              <div>
                <span className="block text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-1">
                  Difficulty
                </span>
                <span className={`inline-block px-3 py-0.5 text-xs font-bold uppercase tracking-wider rounded-lg border ${
                  course?.level === "easy"
                    ? "text-emerald-400 bg-emerald-950/20 border-emerald-900/30"
                    : course?.level === "medium"
                    ? "text-amber-400 bg-amber-950/20 border-amber-900/30"
                    : "text-rose-400 bg-rose-950/20 border-rose-900/30"
                }`}>
                  {course?.level || "Medium"}
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-1">
                  Instructor
                </span>
                <span className="text-slate-200 text-sm font-semibold">
                  Lead Instructor
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-1">
                  Duration
                </span>
                <span className="text-slate-200 text-sm font-semibold">
                  {course?.duration || 0} weeks
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-1">
                  Access Plan
                </span>
                <span className="inline-block text-emerald-400 text-xs font-extrabold uppercase tracking-wider bg-emerald-400/10 px-2.5 py-0.5 rounded-lg border border-emerald-400/20">
                  Free
                </span>
              </div>
            </div>

            {/* Course Action Header */}
            <div className='flex items-center justify-between p-4 bg-slate-900/60 rounded-2xl border border-slate-800/60'>
              <span className="text-sm font-semibold text-slate-300">
                {enrolled ? "You have active access to this course." : "Get instant access to this course for free."}
              </span>
              <Button
                disabled={enrolled}
                className={`rounded-xl flex items-center justify-center font-bold px-6 py-3 shadow-lg transition-all duration-200 ${
                  enrolled 
                    ? "bg-emerald-950/30 text-emerald-400 border border-emerald-500/20 cursor-default" 
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/15"
                }`}
                onClick={handleEnroll}
              >
                {enrolled ? (
                  <span className='flex items-center space-x-1.5'>
                    <span>Enrolled</span>
                    <MdDone size={18} />
                  </span>
                ) : (
                  <span>Enroll Now</span>
                )}
              </Button>
            </div>

            {/* Syllabus Accordion list */}
            <div className='space-y-3'>
              <h4 className='text-xl font-bold text-white tracking-tight'>Course Syllabus</h4>
              <div className='border border-slate-800/80 rounded-2xl overflow-hidden bg-[#090d16]/30'>
                {/* Module 1 */}
                <div
                  className={`p-5 border-b border-slate-800/80 cursor-pointer flex items-center justify-between transition-colors duration-200 ${
                    expandedIndex === 0 ? "bg-slate-900/40" : "hover:bg-slate-900/20"
                  }`}
                  onClick={() => handleToggle(0)}
                >
                  <div className='flex items-center space-x-3'>
                    <span className='w-2 h-2 rounded-full bg-indigo-500' />
                    <span className="font-semibold text-slate-200">Module 1: Introduction to the Course</span>
                  </div>
                  {expandedIndex === 0 ? (
                    <FaAngleUp className='text-slate-400' />
                  ) : (
                    <FaAngleDown className='text-slate-400' />
                  )}
                </div>

                {expandedIndex === 0 && (
                  <div className='bg-[#090d16]/50 border-b border-slate-800/80 p-1'>
                    <Link to={course?.guidelinesUrl ?? ""} target="_blank" rel="noopener noreferrer">
                      <div className='p-4 flex items-center cursor-pointer hover:bg-indigo-500/5 text-slate-300 hover:text-white rounded-xl transition-all duration-150'>
                        <IoBookSharp className='mr-3 text-indigo-400' size={18} />
                        <span className='flex-1 text-sm font-medium'>Important guidelines</span>
                      </div>
                    </Link>
                    {showPdf && course?.guidelinesUrl && (
                      <div className="p-4">
                        <PdfViewer pdfUrl={course.guidelinesUrl} />
                      </div>
                    )}
                  </div>
                )}

                {/* Module 2 */}
                <div
                  className={`p-5 cursor-pointer flex items-center justify-between transition-colors duration-200 ${
                    expandedIndex === 1 ? "bg-slate-900/40" : "hover:bg-slate-900/20"
                  }`}
                  onClick={() => handleToggle(1)}
                >
                  <div className='flex items-center space-x-3'>
                    <span className='w-2 h-2 rounded-full bg-indigo-500' />
                    <span className="font-semibold text-slate-200">Module 2: Advanced Techniques</span>
                  </div>
                  {expandedIndex === 1 ? (
                    <FaAngleUp className='text-slate-400' />
                  ) : (
                    <FaAngleDown className='text-slate-400' />
                  )}
                </div>

                {expandedIndex === 1 && (
                  <div className='bg-[#090d16]/50 p-2 space-y-1 border-t border-slate-800/80'>
                    {lessons && lessons.length > 0 ? (
                      lessons.map((lesson: any) => (
                        <Link to={`watch-lessons/${lesson._id}`} key={lesson._id} className="block">
                          <div className='p-4 flex items-center cursor-pointer hover:bg-indigo-500/5 text-slate-300 hover:text-white rounded-xl transition-all duration-150'>
                            <BiVideo className='mr-3 text-indigo-400' size={18} />
                            <span className='flex-1 text-sm font-medium'>{lesson.title}</span>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="p-4 text-xs italic text-slate-500">No lessons available in this module yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* About / Requirements Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <h4 className='text-xl font-bold text-white tracking-tight'>About this course</h4>
                <div className='bg-slate-900/25 p-5 rounded-2xl border border-slate-800/60 text-slate-300 text-sm leading-relaxed break-words'>
                  {course?.about}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className='text-xl font-bold text-white tracking-tight'>Requirements</h4>
                <ul className='bg-slate-900/25 p-5 rounded-2xl border border-slate-800/60 space-y-3.5'>
                  {course?.requirements.map((item, index) => (
                    <li className='text-slate-300 text-sm flex items-start' key={index}>
                      <span className='text-indigo-400 mr-2.5 font-bold'>&#9679;</span>
                      <span className="flex-1 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reviews Section */}
            <div className='border-t border-slate-800/60 pt-8 space-y-4'>
              <h4 className='text-xl font-bold text-white tracking-tight'>Reviews & Ratings</h4>
              {reviews.length === 0 ? (
                <p className='text-slate-500 italic text-sm'>No reviews for this course yet.</p>
              ) : (
                <div className='space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar'>
                  {reviews.map((rev) => (
                    <div key={rev._id} className='bg-slate-900/20 p-4 rounded-xl border border-slate-800/50 space-y-2'>
                      <div className='flex justify-between items-center'>
                        <span className='font-semibold text-slate-200 text-sm'>
                          {rev.studentId?.firstName} {rev.studentId?.lastName}
                        </span>
                        <div className='flex text-amber-400 space-x-0.5'>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FaStar
                              key={i}
                              size={12}
                              className={i < rev.rating ? "text-amber-400" : "text-slate-700"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className='text-slate-400 text-xs leading-relaxed break-all font-light'>{rev.reviewText}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Rating Form for Enrolled Students */}
            {enrolled && courseId && (
              <div className="pt-2">
                <CourseRatingForm
                  courseId={courseId}
                  onReviewSubmitted={() => {
                    refreshData();
                    fetchReviews(courseId);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourseStudent;
