import React from "react";
import { Rating } from "@material-tailwind/react";
import { CourseInterface } from "../../../types/course";

const CourseCard: React.FC<CourseInterface> = ({
  rating,
  price,
  isPaid,
  title,
  thumbnailUrl,
  description,
  category,
}) => {
  return (
    <div className="w-full bg-slate-900/50 hover:bg-slate-900 rounded-2xl border border-slate-900 hover:border-indigo-500/30 shadow-md transition-all duration-300 overflow-hidden flex flex-col group h-full">
      {/* Thumbnail Container */}
      <div className="relative h-40 w-full overflow-hidden bg-[#06090f] border-b border-slate-950">
        <img
          src={thumbnailUrl}
          alt={title}
          className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-transform duration-500 scale-100 group-hover:scale-105"
        />
        {/* Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        
        {/* Floating Category Badge */}
        {category && (
          <span className="absolute top-3 left-3 bg-[#06090f]/95 backdrop-blur-sm text-[9px] text-indigo-400 font-bold px-2.5 py-0.5 rounded-lg border border-indigo-500/25 uppercase tracking-wider">
            {category}
          </span>
        )}
      </div>

      {/* Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h5 className="text-white text-base font-bold tracking-tight line-clamp-2 mb-2 group-hover:text-indigo-400 transition-colors duration-150">
            {title}
          </h5>
          
          {/* Description */}
          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4 font-light">
            {description}
          </p>
        </div>

        {/* Footer Info */}
        <div>
          {/* Divider */}
          <div className="w-full h-px bg-[#06090f] mb-4" />

          {/* Pricing and Rating */}
          <div className="flex justify-between items-center">
            {/* Price Badge */}
            <div>
              <p className="text-sm font-extrabold text-emerald-400 bg-emerald-950/20 px-2.5 py-0.5 rounded-lg border border-emerald-900/30">
                Free
              </p>
            </div>

            {/* Rating stars */}
            <div className="flex items-center gap-1">
              <Rating value={Math.round(rating)} readonly className="text-amber-400 gap-0.5" />
              <span className="text-slate-300 text-xs font-semibold ml-0.5">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
