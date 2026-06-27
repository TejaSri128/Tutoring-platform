import React, { useEffect, useState, ChangeEvent } from "react";
import InstructorCard from "./instructor-card";
import { Link } from "react-router-dom";
import { getAllInstructors } from "../../../api/endpoints/instructor-management";
import { InstructorApiResponse } from "../../../api/types/apiResponses/api-response-instructors";
import { toast } from "react-toastify";
import ShimmerListAllInstructors from "../../shimmer/shimmer-list-all-instructors";
import FilterInstructorSelectBox from "./filter-instructor-select-box";
import { RiSearchLine } from "react-icons/ri";
import { Spinner } from "@material-tailwind/react";

type Props = {};

const ListAllInstructors: React.FC<Props> = () => {
  const [instructors, setInstructors] = useState<
    InstructorApiResponse[] | undefined
  >(undefined);
  const [filteredInstructors, setFilteredInstructors] = useState<
    InstructorApiResponse[] | undefined
  >(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [debouncedFilter, setDebouncedFilter] = useState<number | undefined>(
    undefined
  );

  const fetchInstructors = async () => {
    try {
      setIsLoading(true);
      const response = await getAllInstructors();
      setInstructors(response?.data?.data);
      setFilteredInstructors(response?.data?.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ) => {
    let timeoutId: number | undefined;
    return (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(() => {
        func(...args);
      }, delay);
      setDebouncedFilter(timeoutId);
    };
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  useEffect(() => {
    const debouncedFilterFunc = debounce(() => {
      setIsSearchLoading(true);
      const searchResult = instructors?.filter(
        (instructor) =>
          instructor.firstName.toLowerCase().trim().includes(searchQuery.toLowerCase()) ||
          instructor.lastName.toLowerCase().trim().includes(searchQuery.toLowerCase())
      );
      setTimeout(() => {
        setFilteredInstructors(searchResult);
        setIsSearchLoading(false);
      }, 500);
    }, 200);

    debouncedFilterFunc();

    return () => {
      if (debouncedFilter) {
        clearTimeout(debouncedFilter);
      }
    };
  }, [searchQuery, instructors]);

  const filteredAndSearchedInstructors = filteredInstructors?.filter(
    (instructor) =>
      filterValue.length === 0 ||
      instructor.subjects.some((category) => filterValue.includes(category))
  );

  const handleSelect = (value: string) => {
    setFilterValue(value);
  };

  if (isLoading || instructors === undefined) {
    return <ShimmerListAllInstructors />;
  }

  return (
    <div className="bg-[#090d16] min-h-screen text-slate-100 pb-16 font-sans relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-80 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40rem] right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#090d16] via-slate-900 to-indigo-950 text-white py-14 px-6 border-b border-slate-900 shadow-inner">
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Our Instructors
          </h1>
          <p className="mt-2 text-slate-400 text-sm md:text-base font-light">
            Meet TutorTrek subject experts and learn from veteran industry software engineers.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="max-w-6xl mx-auto px-4 mt-8 relative z-10">
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-900 shadow-lg shadow-black/20 backdrop-blur-md flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-1/3">
            <FilterInstructorSelectBox handleSelect={handleSelect} />
          </div>
          
          <div className="relative w-full md:w-1/2">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <RiSearchLine size={20} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-[#090d16]/80 text-slate-100 placeholder-slate-500"
              placeholder="Search instructors by name..."
            />
          </div>
        </div>
      </div>

      {/* Instructors Card Grid */}
      <div className="max-w-6xl mx-auto px-4 mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {isSearchLoading ? (
            <div className="col-span-full py-12">
              <Spinner color="indigo" className="h-8 w-8" />
            </div>
          ) : filteredAndSearchedInstructors?.length ? (
            filteredAndSearchedInstructors?.map((instructor) => (
              <Link 
                key={instructor._id} 
                to={`/tutors/${instructor._id}`}
                className="block transition-transform duration-200 hover:-translate-y-1.5 h-full w-full max-w-[22rem]"
              >
                <InstructorCard {...instructor} />
              </Link>
            ))
          ) : (
            <div className="col-span-full bg-slate-900/30 p-12 rounded-2xl border border-slate-900 text-center max-w-md mx-auto mt-6 backdrop-blur-sm">
              <p className="text-slate-400 text-sm font-light">
                No instructors match the search filters. Try resetting search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListAllInstructors;
