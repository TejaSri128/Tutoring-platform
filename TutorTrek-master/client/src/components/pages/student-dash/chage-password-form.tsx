import { useState } from "react";
import { useFormik } from "formik";
import { changePassword } from "../../../api/endpoints/student";
import { toast } from "react-toastify";
import { PasswordInfo } from "../../../api/types/student/student";
import { PasswordValidationSchema } from "../../../validations/student";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface Props {
  editMode: boolean;
  setEditMode: (val: boolean) => void;
}

const ChangePasswordForm: React.FC<Props> = ({ editMode, setEditMode }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleSubmit = async (passwordInfo: PasswordInfo) => {
    try {
      const response = await changePassword(passwordInfo);
      response?.data?.status === "success" && formik.resetForm();
      setEditMode(false);
      toast.success(response?.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error: any) {
      toast.error(error?.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      repeatPassword: "",
    },
    validationSchema: PasswordValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const togglePasswordVisibility = (field: string) => {
    switch (field) {
      case "currentPassword":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "newPassword":
        setShowNewPassword(!showNewPassword);
        break;
      case "repeatPassword":
        setShowRepeatPassword(!showRepeatPassword);
        break;
      default:
        break;
    }
  };

  const getPasswordInputType = (field: string) => {
    switch (field) {
      case "currentPassword":
        return showCurrentPassword ? "text" : "password";
      case "newPassword":
        return showNewPassword ? "text" : "password";
      case "repeatPassword":
        return showRepeatPassword ? "text" : "password";
      default:
        return "password";
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='relative z-0 w-full mb-6 group'>
        <input
          type={getPasswordInputType("currentPassword")}
          name='currentPassword'
          id='floating_current_password'
          disabled={!editMode}
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`block py-2.5 px-0 w-full text-sm text-slate-100 bg-transparent border-0 border-b-2 border-slate-800 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer disabled:opacity-50 ${
            formik.touched.currentPassword && formik.errors.currentPassword
              ? "border-red-500"
              : ""
          }`}
          placeholder=' '
        />
        {formik.touched.currentPassword && formik.errors.currentPassword && (
          <div className='text-red-500 text-xs mt-1 font-medium'>
            {formik.errors.currentPassword}
          </div>
        )}
        <label
          htmlFor='floating_current_password'
          className={`peer-focus:font-medium absolute text-sm text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${
            formik.values.currentPassword
              ? "peer-placeholder-shown:scale-100"
              : ""
          } peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-indigo-400`}
        >
          Current Password
        </label>
        <button
          type='button'
          className='absolute right-0 top-2/4 transform -translate-y-2/4 mr-2 focus:outline-none'
          onClick={() => togglePasswordVisibility("currentPassword")}
        >
          {showCurrentPassword ? (
            <AiOutlineEyeInvisible className='text-indigo-400 hover:text-indigo-300 transition-colors text-base' />
          ) : (
            <AiOutlineEye className='text-indigo-400 hover:text-indigo-300 transition-colors text-base' />
          )}
        </button>
      </div>
      <div className='relative z-0 w-full mb-6 group'>
        <input
          type={getPasswordInputType("newPassword")}
          name='newPassword'
          disabled={!editMode}
          id='floating_password'
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`block py-2.5 px-0 w-full text-sm text-slate-100 bg-transparent border-0 border-b-2 border-slate-800 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer disabled:opacity-50 ${
            formik.touched.newPassword && formik.errors.newPassword
              ? "border-red-500"
              : ""
          }`}
          placeholder=' '
        />
        {formik.touched.newPassword && formik.errors.newPassword && (
          <div className='text-red-500 text-xs mt-1 font-medium'>
            {formik.errors.newPassword}
          </div>
        )}
        <label
          htmlFor='floating_password'
          className={`peer-focus:font-medium absolute text-sm text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${
            formik.values.newPassword ? "peer-placeholder-shown:scale-100" : ""
          } peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-indigo-400`}
        >
          Password
        </label>
        <button
          type='button'
          className='absolute right-0 top-2/4 transform -translate-y-2/4 mr-2 focus:outline-none'
          onClick={() => togglePasswordVisibility("newPassword")}
        >
          {showNewPassword ? (
            <AiOutlineEyeInvisible className='text-indigo-400 hover:text-indigo-300 transition-colors text-base' />
          ) : (
            <AiOutlineEye className='text-indigo-400 hover:text-indigo-300 transition-colors text-base' />
          )}
        </button>
      </div>
      <div className='relative z-0 w-full mb-6 group'>
        <input
          type={getPasswordInputType("repeatPassword")}
          name='repeatPassword'
          disabled={!editMode}
          id='floating_repeat_password'
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`block py-2.5 px-0 w-full text-sm text-slate-100 bg-transparent border-0 border-b-2 border-slate-800 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer disabled:opacity-50 ${
            formik.touched.repeatPassword && formik.errors.repeatPassword
              ? "border-red-500"
              : ""
          }`}
          placeholder=' '
        />
        {formik.touched.repeatPassword && formik.errors.repeatPassword && (
          <div className='text-red-500 text-xs mt-1 font-medium'>
            {formik.errors.repeatPassword}
          </div>
        )}
        <label
          htmlFor='floating_repeat_password'
          className={`peer-focus:font-medium absolute text-sm text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${
            formik.values.repeatPassword
              ? "peer-placeholder-shown:scale-100"
              : ""
          } peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-indigo-400`}
        >
          Confirm password
        </label>
        <button
          type='button'
          className='absolute right-0 top-2/4 transform -translate-y-2/4 mr-2 focus:outline-none'
          onClick={() => togglePasswordVisibility("repeatPassword")}
        >
          {showRepeatPassword ? (
            <AiOutlineEyeInvisible className='text-indigo-400 hover:text-indigo-300 transition-colors text-base' />
          ) : (
            <AiOutlineEye className='text-indigo-400 hover:text-indigo-300 transition-colors text-base' />
          )}
        </button>
      </div>
      <div className='relative pt-8 pr-1'>
        {editMode && (
          <button
            type='submit'
            className='text-white absolute bottom-0 right-0 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 transition-all duration-200 text-sm'
          >
            Reset
          </button>
        )}
      </div>
    </form>
  );
};

export default ChangePasswordForm;
