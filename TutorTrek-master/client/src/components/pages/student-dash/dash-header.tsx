import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  IconButton,
  MenuItem
} from "@material-tailwind/react";
import { FaUserGraduate } from "react-icons/fa";
import { PowerIcon } from "@heroicons/react/24/solid";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { Bars2Icon } from "@heroicons/react/24/outline";

const NavItems = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: MdDashboard 
  },
  {
    path: "/dashboard/my-courses",
    name: "My courses",
    icon: FaUserGraduate
  },
  {
    path: "/dashboard/my-profile",
    name: "My profile",
    icon: CgProfile 
  },
  {
    path: "/dashboard/settings",
    name: "Settings",
    icon: FiSettings
  },
  {
    path: "",
    name: "Log Out",
    icon: PowerIcon
  },
];
 
function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {NavItems.map(({ name, icon, path }, key) => (
        <Link to={path} key={key} className="block w-full">
          <MenuItem className="flex items-center gap-2 lg:rounded-full text-slate-300 hover:bg-slate-800 hover:text-white transition-all text-xs font-semibold py-2 px-4">
            {React.createElement(icon, { className: "h-[16px] w-[16px] text-indigo-400" })}{" "}
            {name}
          </MenuItem>
        </Link>
      ))}
    </ul>
  );
}
    
export default function InstructorHeader() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);
 
  return (
    <nav className="w-full bg-slate-900 border-b border-slate-900/60 px-6 py-4 flex items-center justify-between text-white z-20 shadow-lg shadow-black/10">
      <div className="relative flex items-center w-full">
        <span className="font-extrabold text-2xl tracking-tight text-white mr-4">
          TutorTrek
        </span>
        <IconButton
          size="sm"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden text-white"  
        > 
          <Bars2Icon className="h-6 w-6 text-white" />      
        </IconButton>
      </div>
      <Collapse open={isNavOpen} className="overflow-hidden lg:hidden">
        <NavList />
      </Collapse>
    </nav>
  );
}
