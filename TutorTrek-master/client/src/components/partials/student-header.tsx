import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "../elements/profile-menu";
import { selectIsLoggedIn } from "../../redux/reducers/authSlice";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { APP_LOGO } from "../../constants/common";
import { selectUserType } from "../../redux/reducers/authSlice";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Tutors", href: "/tutors" },
  { name: "Community", href: "/community" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const StudentHeader: React.FC = () => {
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUserType);

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#090d16]/80 border-b border-slate-900 shadow-lg shadow-black/45">
      <Disclosure as="nav" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between h-16">
              {/* Logo & Navigation */}
              <div className="flex items-center gap-8">
                <div className="flex-shrink-0 transition-transform duration-200 hover:scale-105">
                  <Link to="/">
                    <img className="h-9 w-auto filter brightness-110" src={APP_LOGO} alt="TutorTrek" />
                  </Link>
                </div>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-1">
                  {navigation.map((item) => {
                    const active = isLinkActive(item.href);
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          active
                            ? "bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20"
                            : "text-slate-300 hover:text-indigo-400 hover:bg-slate-900/40",
                          "rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 border border-transparent"
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons / Profile */}
              <div className="hidden md:flex items-center gap-4">
                {isLoggedIn && user === "student" ? (
                  <div className="flex items-center gap-4">
                    <Link to="/dashboard">
                      <Button 
                        size="md" 
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/15 transition-all duration-200 normal-case"
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <div className="border-l border-slate-800 pl-4">
                      <ProfileMenu />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link to="/login">
                      <button className="text-slate-300 hover:text-indigo-400 hover:bg-slate-900/40 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200">
                        Login
                      </button>
                    </Link>
                    <Link to="/register">
                      <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/15 transition-all duration-200">
                        Register
                      </button>
                    </Link>
                    <div className="h-6 w-px bg-slate-800 mx-1" />
                    <Link to="/instructors/login">
                      <button className="bg-purple-950/20 text-purple-400 hover:bg-purple-950/45 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 border border-purple-900/30">
                        Instructor Portal
                      </button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 focus:outline-none transition-colors duration-200">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>

            {/* Mobile panel */}
            <Disclosure.Panel className="md:hidden border-t border-slate-900 py-3 space-y-1 animate-fade-in-up">
              <div className="space-y-1 px-2">
                {navigation.map((item) => {
                  const active = isLinkActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        active
                          ? "bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20"
                          : "text-slate-300 hover:text-indigo-400 hover:bg-slate-900/40",
                        "block rounded-xl px-4 py-2.5 text-base font-medium transition-all duration-150 border border-transparent"
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              
              <div className="border-t border-slate-900 pt-4 pb-2 px-4 space-y-2">
                {isLoggedIn && user === "student" ? (
                  <Link to="/dashboard" className="block w-full">
                    <Button 
                      fullWidth
                      size="md" 
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl"
                    >
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="block w-full">
                      <button className="w-full text-center text-slate-300 hover:text-indigo-400 hover:bg-slate-900/40 text-base font-semibold py-2.5 rounded-xl transition-all duration-200 border border-slate-900">
                        Login
                      </button>
                    </Link>
                    <Link to="/register" className="block w-full">
                      <button className="w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white text-base font-semibold py-2.5 rounded-xl shadow-lg shadow-indigo-600/15 transition-all duration-200">
                        Register
                      </button>
                    </Link>
                    <Link to="/instructors/login" className="block w-full">
                      <button className="w-full text-center bg-purple-950/20 text-purple-400 hover:bg-purple-950/45 text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 border border-purple-900/30">
                        Instructor Portal
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
};

export default StudentHeader;
