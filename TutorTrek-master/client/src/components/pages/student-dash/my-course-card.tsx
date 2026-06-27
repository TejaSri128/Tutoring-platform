import React from "react";
import { CourseInterface } from "../../../types/course";
import { BsPlayCircle } from "react-icons/bs";

const MyCourseCard: React.FC<CourseInterface> = ({
  coursesEnrolled,
  title,
  thumbnailUrl,
  description,
  duration,
}) => {
  return (
    <div className="w-80 h-[25rem] bg-slate-900/90 border border-slate-850 hover:border-slate-800 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300 overflow-hidden rounded-2xl flex flex-col hover:-translate-y-1 group">
      
      {/* Thumbnail */}
      <div className="h-48 overflow-hidden relative border-b border-slate-950">
        <img
          src={thumbnailUrl}  
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-indigo-400 transition-colors duration-200">
              {title}
            </h3>
            <span className="text-[10px] text-indigo-300 font-bold px-2 py-0.5 bg-indigo-500/10 rounded-full whitespace-nowrap border border-indigo-500/20">
              {duration} Weeks
            </span>
          </div>
          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed font-light">
            {description}
          </p>
        </div>

        {/* Footer Button */}
        <button
          className="w-full mt-4 bg-[#090d16]/80 text-slate-200 border border-slate-800 hover:bg-indigo-600/15 hover:text-indigo-400 hover:border-indigo-500/30 font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 text-sm shadow-inner"
        >
          <span>Watch Now</span>
          <BsPlayCircle className="text-lg transition-transform duration-200 group-hover:scale-110" />
        </button>
      </div>

    </div>
  );
};

export default MyCourseCard;
