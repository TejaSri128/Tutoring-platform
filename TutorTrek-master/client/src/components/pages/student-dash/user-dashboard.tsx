import React from "react";
import DashSideNav from "./dash-side-nav";
import DashHeader from "./dash-header";
import { Outlet } from "react-router-dom";

type Props = {};

const UserDashboard: React.FC = (props: Props) => {
  return (
    <div className="fixed inset-x-0 top-0 flex flex-col font-sans bg-[#090d16] min-h-screen text-slate-100">
      <DashHeader />

      {/* For small screens, hide the side nav */}
      <div className="block md:hidden bg-[#090d16]">
        <div className="flex flex-col ">
          <div className="pb-32 h-screen overflow-y-auto scrollbar-thin bg-[#090d16]">
            <Outlet />
          </div>
        </div>
      </div>

      {/* For medium and large screens, show the side nav */}
      <div className="hidden md:flex flex-1 bg-[#090d16]">
        <div className="w-64 h-screen overflow-y-auto scrollbar-thin">
          <DashSideNav />
        </div>
        <div className="flex flex-col flex-1 bg-[#090d16]">
          <div className="p-4 bg-[#090d16] overflow-y-scroll scrollbar-thin pb-32 h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
