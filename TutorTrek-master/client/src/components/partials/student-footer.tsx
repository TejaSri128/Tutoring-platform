import React from "react";
 
const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];
 
const currentYear = new Date().getFullYear();
 
export default function StudentFooter() {
  return (
    <footer className="relative w-full mt-20 border-t border-slate-900 bg-slate-950/40 py-10 backdrop-blur-md">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-1 justify-between gap-8 md:grid-cols-2">
          <h5 className="mb-6 text-white text-xl font-extrabold tracking-tight">
            TutorTrek
          </h5>
          <div className="grid grid-cols-3 justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title} className="space-y-2">
                <li className="mb-2 font-bold text-indigo-400 uppercase tracking-wider text-[11px]">
                  {title}
                </li>
                {items.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="py-1 text-slate-400 hover:text-white transition-colors duration-150 text-xs font-light block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-slate-900 py-6 md:flex-row md:justify-between">
          <p className="mb-4 text-center font-normal text-slate-500 md:mb-0 text-xs">
            &copy; {currentYear} TutorTrek. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}