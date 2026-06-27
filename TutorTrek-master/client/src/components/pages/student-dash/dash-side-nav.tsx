import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { APP_LOGO } from "../../../constants/common";

const NavItems = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <MdDashboard className="h-5 w-5" />
  },
  {
    path: "/dashboard/my-courses",
    name: "My courses",
    icon: <FaUserGraduate className="h-5 w-5" />
  },
  {
    path: "/dashboard/my-profile",
    name: "My profile",
    icon: <CgProfile className="h-5 w-5" />
  },
  {
    path: "#",
    name: "Settings",
    icon: <FiSettings className="h-5 w-5" />
  },
];

const SideNav: React.FC = () => {
  const [selected, setSelected] = useState<string>("Dashboard");

  return (
    <div className="fixed top-0 left-0 h-full w-[17rem] bg-slate-900 border-r border-slate-900/60 p-4 flex flex-col z-20 text-slate-100 font-sans shadow-2xl shadow-black/40">
      <div className="mb-4 p-2 flex items-center gap-4 pl-3">
        <Link to="/">
          <img className="h-9" src={APP_LOGO} alt="brand" />
        </Link>
      </div>                 
      
      <hr className="my-3 border-slate-800/80" />
      
      <ul className="space-y-1">
        {NavItems.map(({ icon, name, path }, index) => {
          const isActive = name === selected;
          return (
            <li key={index}>
              <Link
                to={path} 
                onClick={() => {
                  setSelected(name);
                }}  
              > 
                <div
                  className={`mt-2 flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                    isActive
                      ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 font-bold"
                      : "text-slate-350 hover:bg-slate-800/50 hover:text-white"
                  }`}
                >
                  <span className={isActive ? "text-indigo-400" : "text-slate-400"}>{icon}</span>
                  <span>{name}</span>
                </div>
              </Link>
            </li>
          );  
        })}
      </ul>
    </div> 
  );
};

export default SideNav;
