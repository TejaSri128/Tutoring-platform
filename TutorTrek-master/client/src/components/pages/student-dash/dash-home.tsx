import React from "react";
import { Tooltip } from "@material-tailwind/react";
import { InformationCircleIcon, FireIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { selectStudent } from "../../../redux/reducers/studentSlice";

type Props = {};

const DashHome: React.FC = (props: Props) => {
  const student = useSelector(selectStudent);
  const fullName = student.studentDetails
    ? `${student.studentDetails.firstName} ${student.studentDetails.lastName}`
    : "Student";

  return (
    <div className="w-full flex justify-center items-center py-10 px-4 bg-[#090d16] min-h-screen text-slate-100 font-sans">
      <div className="w-full max-w-6xl space-y-8 relative z-10">
        
        {/* Welcome Section */}
        <div className="border-b border-slate-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Welcome back, <span className="text-indigo-400">{fullName}</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1 font-light">
              Here is your learning summary and assignment progress for this week.
            </p>
          </div>
          {/* Mock Streak Badge */}
          <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-2xl shadow-lg shadow-indigo-500/5 animate-pulse-glow">
            <FireIcon className="w-5 h-5 text-orange-500 animate-bounce" />
            <span className="text-sm font-semibold text-indigo-200">2 Day Streak</span>
          </div>
        </div>

        {/* Assignments Section */}
        <div className="space-y-4">
          <h5 className="text-indigo-400 font-extrabold uppercase tracking-wider text-xs">
            My Assignments
          </h5>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Blank Canvas / Goals Panel */}
            <div className="lg:col-span-8 bg-slate-900/40 border border-slate-900 rounded-3xl p-8 backdrop-blur-md shadow-2xl flex flex-col justify-center items-center text-center space-y-6 relative overflow-hidden min-h-[350px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="max-w-md space-y-3 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
                  There’s nothing harder than starting from a blank canvas.
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  Set a goal and we'll be your accountability partner with custom reminders and weekly progress reports.
                </p>
              </div>

              <button className="relative z-10 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 transition-all duration-200">
                Set Yourself a Goal
              </button>
            </div>

            {/* Weekly Goal Panel */}
            <div className="lg:col-span-4 bg-slate-900/40 border border-slate-900 rounded-3xl p-6 backdrop-blur-md shadow-2xl flex flex-col justify-between min-h-[350px]">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-900">
                  <h3 className="text-base font-bold text-white">My Weekly Goal</h3>
                  <Tooltip
                    content={
                      <div className="w-64 p-1">
                        <p className="font-semibold text-xs text-white uppercase tracking-wider mb-1">Weekly Goal Info</p>
                        <p className="font-light text-xs text-slate-200 leading-relaxed">
                          To achieve your goal for a day, complete any lecture, lab, quiz, or exam.
                        </p>
                      </div>
                    }
                  >
                    <InformationCircleIcon
                      strokeWidth={2}
                      className="text-slate-400 hover:text-indigo-400 w-5 h-5 cursor-pointer transition-colors duration-200"
                    />
                  </Tooltip>
                </div>

                <div className="bg-[#090d16]/80 border border-slate-850 rounded-2xl p-4 shadow-inner">
                  <p className="text-xs text-slate-350 font-light leading-relaxed">
                    Make it a habit! Each day that you complete a lecture, practice with a lab, or take a quiz or exam you'll build your learning streak.
                  </p>
                </div>
              </div>

              {/* Mock Progress Indicator */}
              <div className="space-y-2 mt-6">
                <div className="flex justify-between text-xs font-semibold text-slate-400">
                  <span>Weekly Progress</span>
                  <span className="text-indigo-400">40% Completed</span>
                </div>
                <div className="w-full bg-[#090d16] rounded-full h-2 border border-slate-800 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full w-2/5" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashHome;
