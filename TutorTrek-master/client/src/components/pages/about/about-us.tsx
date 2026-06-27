import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-[#090d16] min-h-screen text-slate-100 py-16 px-4 relative overflow-hidden font-sans">
      {/* Background blurs */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        {/* Header Title */}
        <div className="border-b border-slate-900 pb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">About TutorTrek</h1>
          <p className="mt-2 text-sm text-slate-400 font-light">
            Empowering the next generation of software engineers through peer-guided learning.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Graphic Banner */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative group overflow-hidden rounded-2xl border border-slate-900 shadow-2xl shadow-indigo-950/20 max-w-md w-full bg-[#06090f]">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600"
                alt="TutorTrek Development Terminal"
                className="w-full h-auto object-cover opacity-85 group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Description Text Container */}
          <div className="w-full lg:w-1/2 space-y-5 bg-slate-900/35 p-6 md:p-8 rounded-3xl border border-slate-900 backdrop-blur-md">
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
              Welcome to <span className="font-semibold text-indigo-400">TutorTrek</span>, the premier online learning ecosystem built specifically for developers, system architects, and tech enthusiasts. We connect veteran industry leaders with aspiring software creators around the globe.
            </p>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
              Our platform offers a curated range of high-quality programming courses. By removing checkout gates and paywalls, we enable students to gain full direct access to our comprehensive syllabuses and interactive resources.
            </p>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
              What sets TutorTrek apart is our active developer community. Students can participate in real-time channel chats, share technical insights, collaborate on code bases, and query instructors through integrated discussions.
            </p>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light border-t border-slate-800/60 pt-4">
              Join <span className="font-semibold text-indigo-400">TutorTrek</span> today and embark on a journey of deep technical growth and community connection. Let's write the future together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
