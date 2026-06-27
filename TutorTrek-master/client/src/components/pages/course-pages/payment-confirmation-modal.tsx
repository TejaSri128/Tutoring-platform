import React, { useState, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { enrollStudent } from "../../../api/endpoints/course/course";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

interface PaymentModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdated: () => void;
  courseDetails: {
    title?: string;
    price: number;
    overview: string;
    isPaid: boolean;
  };
}

const PaymentConfirmationModal: React.FC<PaymentModalProps> = ({
  open,
  setOpen,
  setUpdated,
  courseDetails,
}) => {
  const handleOpen = () => setOpen((cur) => !cur);
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClose = () => setOpen(false);

  const handleCourseEnroll = async () => {
    try {
      setIsLoading(true);
      const response = await enrollStudent(courseId ?? "");
      setTimeout(() => {
        setUpdated();
        setIsLoading(false);
        setOpen(false);
        toast.success(response?.message || "Successfully enrolled into the course", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong ", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <Fragment>
      <Dialog 
        open={open} 
        size='sm' 
        handler={handleOpen}
        className="bg-[#090d16] border border-slate-800 text-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in"
      >
        <DialogHeader className="border-b border-slate-800/50 pb-4">
          <div className='flex items-center space-x-3 text-indigo-400'>
            <CheckCircleIcon className='h-7 w-7' />
            <Typography
              variant='h5'
              className='font-bold tracking-tight text-white'
            >
              Confirm Enrollment
            </Typography>
          </div>
        </DialogHeader>
        <DialogBody className="text-slate-300 py-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <Typography className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Course
              </Typography>
              <Typography className="text-lg font-bold text-white leading-snug">
                {courseDetails?.title || "Course Details"}
              </Typography>
            </div>
            
            <div className="bg-[#0c1220]/50 p-4 rounded-xl border border-slate-800/40">
              <Typography className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
                Overview
              </Typography>
              <Typography className="text-sm text-slate-300 leading-relaxed max-h-40 overflow-y-auto pr-1">
                {courseDetails?.overview}
              </Typography>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-emerald-950/20 rounded-xl border border-emerald-900/30 text-emerald-400">
              <span className="text-sm font-medium">Pricing Plan</span>
              <span className="text-sm font-extrabold uppercase tracking-wider bg-emerald-400/10 px-2.5 py-0.5 rounded-lg border border-emerald-400/20">
                Free
              </span>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="border-t border-slate-800/50 pt-4 flex flex-col gap-2">
          <Button  
            variant='gradient'
            className='w-full from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200 flex items-center justify-center'
            onClick={handleCourseEnroll}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className='flex items-center space-x-2'>
                <span>Enrolling...</span>
                <FaSpinner className='animate-spin' size={18} />
              </span>
            ) : (
              <span>Confirm & Start Learning</span>
            )}
          </Button>
          <Button
            variant='text'
            onClick={handleClose}
            className='w-full text-slate-400 hover:text-white hover:bg-slate-800/20 font-medium py-3 rounded-xl transition-all duration-200'
          >
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default PaymentConfirmationModal;
