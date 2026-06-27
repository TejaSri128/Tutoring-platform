import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { InstructorApiResponse } from "../../../api/types/apiResponses/api-response-instructors";

const InstructorCard: React.FC<InstructorApiResponse> = ({
  firstName,
  lastName,
  subjects,
  qualification,
  skills,
  profileUrl,
  about,
}) => {
  return (
    <Card className="group w-full bg-slate-900/50 hover:bg-slate-900 rounded-2xl border border-slate-900 hover:border-indigo-500/30 shadow-md transition-all duration-300 overflow-hidden flex flex-col h-[26rem]">
      {/* Decorative Gradient Header Band */}
      <div className="h-24 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 relative">
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Avatar Container positioned overlapping the header band */}
      <div className="relative flex justify-center -mt-12">
        <Avatar
          size="xxl"
          variant="circular"
          alt={`${firstName} ${lastName}`}
          className="h-24 w-24 border-4 border-slate-900 shadow-md transition-transform duration-300 group-hover:scale-105 object-cover"
          src={profileUrl || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150"}
        />
      </div>

      {/* Profile Details Content */}
      <CardBody className="p-6 flex-1 flex flex-col justify-between text-center pt-3">
        <div>
          {/* Name */}
          <Typography variant="h5" className="text-white font-extrabold text-lg tracking-tight">
            {firstName + " " + lastName}
          </Typography>
          
          {/* Qualification */}
          <p className="text-indigo-400 text-xs font-semibold mt-1">
            {qualification}
          </p>

          {/* About description line clamped */}
          <p className="text-slate-400 text-xs mt-3 line-clamp-3 leading-relaxed px-1 font-light">
            {about}
          </p>
        </div>

        <div>
          {/* Divider */}
          <div className="w-full h-px bg-[#06090f] my-4" />

          {/* Subjects and Skills Pills */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1 justify-center">
              {subjects.map((subject, idx) => (
                <span 
                  key={idx} 
                  className="text-[10px] font-bold text-slate-350 bg-slate-800 px-2.5 py-0.5 rounded-md"
                >
                  {subject}
                </span>
              ))}
            </div>
            
            <p className="text-slate-500 text-[10px] font-medium line-clamp-1">
              Skills: {skills}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default InstructorCard;
