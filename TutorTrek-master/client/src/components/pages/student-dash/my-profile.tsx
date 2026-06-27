import React, { useEffect, useState } from "react";
import ProfileForm from "./profile-from";
import ChangePasswordForm from "./chage-password-form";
import { fetchStudentData } from "../../../redux/reducers/studentSlice";
import { useDispatch } from "react-redux";
import { FiEdit } from "react-icons/fi";

const MyProfile: React.FC = () => {
  const dispatch = useDispatch();
  // const [editMode, setEditMode] = useState(false);
  // const [editType, setEditType] = useState("");
  const [editState, setEditState] = useState({ mode: false, type: "" });

  useEffect(() => {
    dispatch(fetchStudentData());
  }, [dispatch]);

  const handleEditClick = (type: string) => {
    setEditState({ mode: true, type: type });
  };

  const handleEditModeClose = () => {
    setEditState({ mode: false, type: "" });
  };

  return (
    <div className="w-full flex justify-center items-center py-6 bg-[#090d16] text-slate-100 font-sans">
      <div className="w-full max-w-6xl space-y-8 relative z-10">
        <div className="border-b border-slate-900 pb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Edit Profile Info
          </h2>
          <p className="text-slate-400 text-sm mt-1 font-light">
            Update your personal account settings, credentials, and password.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 h-full pb-10">
          <div className="bg-slate-900/40 border border-slate-900 lg:w-7/12 w-full h-full rounded-3xl backdrop-blur-md shadow-2xl shadow-black/35 relative overflow-hidden p-6">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="flex justify-between items-center pb-4 border-b border-slate-900 mb-6">
              <h3 className="text-lg text-white font-bold tracking-tight">
                Account Info
              </h3>
              <button
                className="p-2 hover:bg-slate-800 rounded-xl transition-all"
                onClick={() => handleEditClick("account")}
              >
                <FiEdit className="text-indigo-400 hover:text-indigo-300 text-lg transition-colors" />
              </button>
            </div>
            <div>
              <ProfileForm
                editMode={editState.mode && editState.type === "account"}
                setEditMode={handleEditModeClose}
              />
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-900 lg:w-5/12 w-full h-full rounded-3xl backdrop-blur-md shadow-2xl shadow-black/35 relative overflow-hidden p-6">
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="flex justify-between items-center pb-4 border-b border-slate-900 mb-6">
              <h3 className="text-lg text-white font-bold tracking-tight">
                Change Password
              </h3>
              <button
                className="p-2 hover:bg-slate-800 rounded-xl transition-all"
                onClick={() => handleEditClick("password")}
              >
                <FiEdit className="text-indigo-400 hover:text-indigo-300 text-lg transition-colors" />
              </button>
            </div>
            <div>
              <ChangePasswordForm
                editMode={editState.mode && editState.type === "password"}
                setEditMode={handleEditModeClose}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
