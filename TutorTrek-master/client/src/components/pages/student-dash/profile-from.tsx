import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { updateProfile } from "../../../api/endpoints/student";
import { UpdateProfileInfo } from "../../../api/types/student/student";
import { Avatar } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectStudent,
  selectIsFetchingStudent,
  selectStudentError,
  fetchStudentData,
} from "../../../redux/reducers/studentSlice";
import { USER_AVATAR } from "../../../constants/common";

interface Props {
  editMode:boolean;
  setEditMode:(val:boolean)=>void
}
const ProfileForm:React.FC<Props> = ({editMode,setEditMode}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const studentInfo = useSelector(selectStudent)?.studentDetails;
  let isFetching = useSelector(selectIsFetchingStudent);
  const [loading, setLoading] = useState(false);
  const error = useSelector(selectStudentError);
  const [updated, setUpdated] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      formik.setFieldValue("profilePic", file);
    } else {
      setPreviewImage(null);
      formik.setFieldValue("profilePic", null);
    }
  };
 
  useEffect(() =>{
    dispatch(fetchStudentData());
  }, [updated]);

  useEffect(() => {
    if (!studentInfo) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [studentInfo]);

  const handleSubmit = async (profileInfo: UpdateProfileInfo) => {
    try {
      const formData = new FormData();
      if (profileInfo.profilePic) {
        formData.append("image", profileInfo.profilePic);
      }
      formData.append("email", profileInfo.email || "");
      formData.append("firstName", profileInfo.firstName || "");     
      formData.append("lastName", profileInfo.lastName || "");
      formData.append("mobile", profileInfo.mobile || "");

      const response = await updateProfile(formData);
      // formik.resetForm();
      setPreviewImage(null);
      const fileInput = document.getElementById(
        "file_input"
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
      setUpdated(!updated);
      setEditMode(false);
      toast.success(response?.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error: any) {
      setUpdated(!updated);
      toast.error(error?.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: studentInfo?.email || "",
      firstName: studentInfo?.firstName || "",
      lastName: studentInfo?.lastName || "",
      mobile: studentInfo?.mobile || "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // if (isFetching) {
  //   return <div>Loading...</div>;
  // }
  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // if (!studentInfo) {
  //   return <div>loading...</div>
  // }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
      </div>
      <div className='p-5 flex items-center gap-4'>
        <Avatar
          src={previewImage || studentInfo?.profilePic?.url  ||USER_AVATAR}
          alt='avatar'
          size='xl'
          className="border border-slate-800 shadow-md"
        />
        <div className='pl-4 flex-1 space-y-2'>
          <label
            className='block text-xs font-semibold text-slate-350 uppercase tracking-wider'
            htmlFor='file_input'
          >
            Upload profile photo
          </label>
          <input
            className='block w-full text-xs text-slate-100 border border-slate-800 rounded-xl cursor-pointer bg-[#090d16]/80 focus:outline-none placeholder-slate-500 py-2.5 px-3 transition-all'
            id='file_input'
            onChange={handleFileChange}
            type='file'
          />
        </div>
      </div>
      <div className='grid md:grid-cols-2 md:gap-6 mt-6'>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='text'
            name='firstName'
            id='floating_first_name'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            disabled={!editMode}
            onBlur={formik.handleBlur}
            className='block py-2.5 px-0 w-full text-sm text-slate-100 bg-transparent border-0 border-b-2 border-slate-800 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer disabled:opacity-50'
            placeholder=' '
            required
          />
          <label
            htmlFor='floating_first_name'
            className={`peer-focus:font-medium absolute text-sm text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${
              formik.values.firstName ? "peer-placeholder-shown:scale-100" : ""
            } peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-indigo-400`}
          >
            First name
          </label>
        </div>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='text'
            name='lastName'
            id='floating_last_name'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={!editMode}
            className='block py-2.5 px-0 w-full text-sm text-slate-100 bg-transparent border-0 border-b-2 border-slate-800 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer disabled:opacity-50'
            placeholder=' '
            required
          />
          <label
            htmlFor='floating_last_name'
            className={`peer-focus:font-medium absolute text-sm text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${
              formik.values.lastName ? "peer-placeholder-shown:scale-100" : ""
            } peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-indigo-400`}
          >
            Last name
          </label>
        </div>
      </div>
      <div className='relative z-0 w-full mb-6 group'>
        <input
          type='email'
          name='email'
          id='floating_email'
          disabled={!editMode}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='block py-2.5 px-0 w-full text-sm text-slate-100 bg-transparent border-0 border-b-2 border-slate-800 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer disabled:opacity-50'
          placeholder=' '
          required
        />
        <label
          htmlFor='floating_email'
          className={`peer-focus:font-medium absolute text-sm text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${
            formik.values.email ? "peer-placeholder-shown:scale-100" : ""
          } peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-indigo-400`}
        >
          Email address
        </label>
      </div>
      <div className='relative z-0 w-full mb-6 group'>
        <input
          type='text'
          name='mobile'
          id='floating_phone'
          disabled={!editMode}
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='block py-2.5 px-0 w-full text-sm text-slate-100 bg-transparent border-0 border-b-2 border-slate-800 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer disabled:opacity-50'
          placeholder=' '
          required
        />
        <label
          htmlFor='floating_phone'
          className={`peer-focus:font-medium absolute text-sm text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${
            formik.values.mobile ? "peer-placeholder-shown:scale-100" : ""
          } peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-indigo-400`}
        >
          Mobile
        </label>
      </div>
      <div className='relative pt-8 pr-1'>
        {editMode && (
          <button
            type={"submit"}
            className='text-white absolute bottom-0 right-0 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 transition-all duration-200 text-sm'
          >
            Update
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
