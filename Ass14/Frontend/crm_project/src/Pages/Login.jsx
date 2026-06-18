import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../feature/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values) => {
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:5000/login", values);

      if (res.data.token) {
        dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
        alert(res.data.message);
        navigate("/home");
      } else {
        dispatch(loginFailure(res.data.message));
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || "Login failed"));
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <p className="text-lg mt-2">Login to your Customer Relationship Portal</p>
      </div>

      {/* Login Card */}
      <div className="flex justify-center items-center flex-grow bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96">
          <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-600">
            Login
          </h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="w-full border p-3 rounded mb-2 focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mb-4"
                />

                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full border p-3 rounded mb-2 focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mb-4"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
