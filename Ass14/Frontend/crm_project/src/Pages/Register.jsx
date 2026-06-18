import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../feature/userSlice";

const Register = () => {
  const dispatch = useDispatch();

  //  Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string().required("Role is required"),
  });

  const handleRegister = async (values, { resetForm }) => {
    dispatch(registerStart());
    try {
      const res = await axios.post("http://localhost:5000/register", values);
      if (res.data.success) {
        dispatch(registerSuccess(res.data));
        resetForm();
        alert(res.data.message);
      } else {
        dispatch(registerFailure(res.data.message || "Registration failed"));
        alert(res.data.message || "Registration failed");
      }
    } catch (err) {
      dispatch(registerFailure(err.response?.data?.message || "Registration failed"));
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Create Your Account</h1>
        <p className="text-lg mt-2">Register to access the Customer Relationship Portal</p>
      </div>

      {/* Register Card */}
      <div className="flex justify-center items-center flex-grow bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96">
          <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-600">
            Register
          </h2>

          <Formik
            initialValues={{ email: "", username: "", password: "", role: "user" }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="w-full border p-3 rounded mb-2 focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mb-4" />

                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full border p-3 rounded mb-2 focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mb-4" />

                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full border p-3 rounded mb-2 focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mb-4" />

                <Field
                  as="select"
                  name="role"
                  className="w-full border p-3 rounded mb-4 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Field>
                <ErrorMessage name="role" component="div" className="text-red-500 text-sm mb-4" />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition"
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
