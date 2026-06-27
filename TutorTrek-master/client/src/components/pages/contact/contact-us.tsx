import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { submitResponse } from "api/endpoints/contact";

const ContactUs: React.FC = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    message: Yup.string().required("Required"),
  });

  const onSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    try {
      const response = await submitResponse(values);
      response.status === "success" &&
        toast.success(response?.message || "Response submitted successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      resetForm();
    } catch (error) {
      toast.error("Failed to submit your response..!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div className="bg-[#090d16] min-h-screen text-slate-100 flex justify-center items-center py-16 px-4 relative overflow-hidden font-sans">
      {/* Background blurs */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="bg-slate-900/40 p-8 md:p-10 rounded-3xl border border-slate-900 shadow-2xl shadow-black/35 max-w-xl w-full backdrop-blur-md relative z-10 space-y-6 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Contact Us</h1>
          <p className="text-slate-400 text-sm font-light">
            Have questions or feedback? Drop us a message and our team will get back to you shortly.
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-slate-300 font-semibold text-xs uppercase tracking-wider"
                >
                  Your Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-[#090d16]/80 text-slate-100 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-500 transition-all duration-200"
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-rose-400 text-xs font-medium mt-1"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-slate-300 font-semibold text-xs uppercase tracking-wider"
                >
                  Your Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-[#090d16]/80 text-slate-100 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-500 transition-all duration-200"
                  placeholder="name@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-rose-400 text-xs font-medium mt-1"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-slate-300 font-semibold text-xs uppercase tracking-wider"
                >
                  Your Message
                </label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  className="w-full bg-[#090d16]/80 text-slate-100 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-500 transition-all duration-200"
                  placeholder="How can we help you?"
                  rows={4}
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-rose-400 text-xs font-medium mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Send Message"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactUs;
