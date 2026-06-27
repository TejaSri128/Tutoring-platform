import React from "react";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { ApiResponseTrending } from "../../../api/types/apiResponses/api-response-home-page-listing";

interface Props {
  courseInfo: ApiResponseTrending;
}

const TrendingCard: React.FC<Props> = ({ courseInfo }) => {
  const imageUrl = courseInfo?.thumbnailUrl;
  const profileUrl = courseInfo.profileUrl;
  
  return (
    <Card className="group w-full h-[26rem] rounded-2xl border border-slate-900 bg-slate-900/50 hover:bg-slate-900 hover:border-indigo-500/30 shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Upper Logo Area */}
      <div className="relative h-44 w-full bg-[#06090f] overflow-hidden border-b border-slate-900">
        <img 
          src={imageUrl} 
          alt={courseInfo.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
        />
        {/* Glow tint top left */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        
        {/* Course badge */}
        <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-[9px] text-indigo-400 font-bold px-2.5 py-0.5 rounded-lg border border-indigo-500/20 uppercase tracking-widest">
          Trending
        </span>
      </div>

      {/* Main Card Body */}
      <CardBody className="p-5 flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Title */}
          <Typography
            variant="h4"
            className="text-white font-extrabold text-lg tracking-tight leading-snug line-clamp-2 group-hover:text-indigo-400 transition-colors duration-150"
          >
            {courseInfo.title}
          </Typography>
          <p className="text-slate-400 text-xs mt-2 line-clamp-2 font-light">
            Gain comprehensive expert knowledge in modern software engineering with hands-on practice.
          </p>
        </div>

        <div>
          {/* Divider */}
          <div className="w-full h-px bg-slate-900 my-4" />

          {/* Instructor & Profile Details */}
          <div className="flex items-center gap-3">
            <Avatar
              size="md"
              variant="circular"
              alt={courseInfo.instructorFirstName}
              className="border border-slate-800 shadow-sm object-cover"
              src={profileUrl || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150"}
            />
            <div>
              <p className="text-slate-200 text-xs font-semibold">
                {courseInfo.instructorFirstName + " " + courseInfo.instructorLastName}
              </p>
              <p className="text-[10px] text-slate-500">Course Instructor</p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TrendingCard;
