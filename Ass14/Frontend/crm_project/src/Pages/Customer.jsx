import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const { token, role } = useSelector((state) => state.user);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: { Authorization: `Bearer ${token}` },
  });

  // ✅ Validation schema (Name first, then Company Name)
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    companyName: Yup.string().required("Company Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    serviceType: Yup.string().required("Service type is required"),
    city: Yup.string(),
  });

  const fetchCustomers = async () => {
    try {
      const res = await axiosInstance.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (editingCustomer) {
        const res = await axiosInstance.put(`/customers/${editingCustomer._id}`, values);
        if (res.data.success) {
          alert("Customer updated successfully!");
          setEditingCustomer(null);
          resetForm();
          fetchCustomers();
        }
      } else {
        const res = await axiosInstance.post("/customers", values);
        if (res.data.success) {
          alert("Customer added successfully!");
          resetForm();
          fetchCustomers();
        }
      }
    } catch (err) {
      console.error("Error saving customer:", err.response?.data?.message || err);
      alert(err.response?.data?.message || err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`/customers/${id}`);
      if (res.data.success) {
        alert("Customer deleted successfully!");
        fetchCustomers();
      }
    } catch (err) {
      console.error("Error deleting customer:", err);
      alert("Error deleting customer");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Customer Management</h1>
        <p className="text-lg mt-2">Add, edit, and manage customers</p>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Add / Edit Customer Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {editingCustomer ? "Edit Customer" : "Add New Customer"}
          </h2>
          <Formik
            initialValues={
              editingCustomer || {
                name: "",
                companyName: "",
                email: "",
                phone: "",
                serviceType: "Others",
                city: "",
              }
            }
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="grid md:grid-cols-2 gap-4">
                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full border p-2 rounded"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Field
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    className="w-full border p-2 rounded"
                  />
                  <ErrorMessage name="companyName" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    className="w-full border p-2 rounded"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Field as="select" name="serviceType" className="w-full border p-2 rounded">
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Computer">Computer</option>
                    <option value="Building">Building</option>
                    <option value="Mechanic">Mechanic</option>
                    <option value="Others">Others</option>
                  </Field>
                  <ErrorMessage name="serviceType" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Field
                    type="text"
                    name="city"
                    placeholder="City"
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                  >
                    {editingCustomer ? "Update Customer" : "Add Customer"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Customer Table */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Customer List</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Company</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Service</th>
                <th className="border p-2">City</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c._id} className="hover:bg-gray-100">
                  <td className="border p-2">{c.name}</td>
                  <td className="border p-2">{c.companyName}</td>
                  <td className="border p-2">{c.email}</td>
                  <td className="border p-2">{c.phone}</td>
                  <td className="border p-2">{c.serviceType}</td>
                  <td className="border p-2">{c.city}</td>
                  <td className="border p-2 flex gap-2">
                    {role === "admin" && (
                      <>
                        <button
                          onClick={() => setEditingCustomer(c)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customer;
