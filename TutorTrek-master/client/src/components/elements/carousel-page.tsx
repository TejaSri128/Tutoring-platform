import { Carousel, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function CarouselComponent() {
  return (
    <div className="relative overflow-hidden w-full h-[32rem] bg-[#090d16]">
      {/* Decorative top grid accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent z-10" />
      
      <Carousel
        className="h-full w-full"
        autoplay={true}
        autoplayDelay={6000}
        loop={true}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1.5 cursor-pointer rounded-full transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-indigo-500" : "w-2 bg-slate-700"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {/* Slide 1: React & Frontend Coding */}
        <div className="relative h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1600&q=80"
            alt="Software Development"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090d16] via-[#090d16]/85 to-transparent flex items-center">
            <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-20 w-full animate-fade-in-up">
              <div className="max-w-xl bg-slate-900/40 p-8 rounded-3xl border border-slate-800/80 backdrop-blur-lg">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                  Frontend Mastery
                </span>
                <Typography
                  variant="h1"
                  color="white"
                  className="mt-4 mb-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-none"
                >
                  Master Modern Tech Stacks
                </Typography>
                <Typography
                  variant="lead"
                  color="white"
                  className="mb-8 text-slate-350 text-sm sm:text-base leading-relaxed font-light"
                >
                  Deep dive into modular React patterns, strict TypeScript safety, and frontend architecture with production-ready guidelines.
                </Typography>
                <div className="flex flex-wrap gap-3">
                  <Link to="/courses">
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200 normal-case">
                      Explore Courses
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button size="lg" variant="text" color="white" className="hover:bg-white/5 rounded-xl transition-all duration-200 normal-case">
                      About Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2: System Architecture */}
        <div className="relative h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80"
            alt="System Design"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090d16] via-[#090d16]/85 to-transparent flex items-center">
            <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-20 w-full">
              <div className="max-w-xl bg-slate-900/40 p-8 rounded-3xl border border-slate-800/80 backdrop-blur-lg">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                  Distributed Systems
                </span>
                <Typography
                  variant="h1"
                  color="white"
                  className="mt-4 mb-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-none"
                >
                  Scale Architecture Efficiently
                </Typography>
                <Typography
                  variant="lead"
                  color="white"
                  className="mb-8 text-slate-350 text-sm sm:text-base leading-relaxed font-light"
                >
                  Learn cache invalidation, load balancing, database sharding, and modular monolith configurations for massive web scalability.
                </Typography>
                <div className="flex flex-wrap gap-3">
                  <Link to="/courses">
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-600/20 transition-all duration-200 normal-case">
                      Browse Courses
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="text" color="white" className="hover:bg-white/5 rounded-xl transition-all duration-200 normal-case">
                      Support Channels
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3: Terminal & Clean Code */}
        <div className="relative h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80"
            alt="Backend Terminal"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090d16] via-[#090d16]/85 to-transparent flex items-center">
            <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-20 w-full">
              <div className="max-w-xl bg-slate-900/40 p-8 rounded-3xl border border-slate-800/80 backdrop-blur-lg">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  Developer Community
                </span>
                <Typography
                  variant="h1"
                  color="white"
                  className="mt-4 mb-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-none"
                >
                  Connect and Collaborate
                </Typography>
                <Typography
                  variant="lead"
                  color="white"
                  className="mb-8 text-slate-350 text-sm sm:text-base leading-relaxed font-light"
                >
                  Share code snippets, join active developer channels, verify webhooks, and coordinate live reviews in our built-in community.
                </Typography>
                <div className="flex flex-wrap gap-3">
                  <Link to="/community">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/20 transition-all duration-200 normal-case">
                      Join Community
                    </Button>
                  </Link>
                  <Link to="/tutors">
                    <Button size="lg" variant="text" color="white" className="hover:bg-white/5 rounded-xl transition-all duration-200 normal-case">
                      Subject Experts
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
