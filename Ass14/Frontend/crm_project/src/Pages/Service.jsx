import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Service = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchService, setSearchService] = useState("");

  const { token } = useSelector((state) => state.user);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: { Authorization: `Bearer ${token}` },
  });

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axiosInstance.get("/customers");
        setCustomers(res.data);
        setFilteredCustomers(res.data);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };
    fetchCustomers();
  }, []);

  // Filter customers by name and service type
  useEffect(() => {
    let data = customers;

    if (searchName) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchService) {
      data = data.filter((c) =>
        c.serviceType.toLowerCase().includes(searchService.toLowerCase())
      );
    }

    setFilteredCustomers(data);
  }, [searchName, searchService, customers]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Service Page</h1>
        <p className="text-lg mt-2">Search customers by name or service type</p>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Search Filters */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full md:w-1/2 border p-2 rounded"
          />
          <select
            value={searchService}
            onChange={(e) => setSearchService(e.target.value)}
            className="w-full md:w-1/2 border p-2 rounded"
          >
            <option value="">All Services</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Computer">Computer</option>
            <option value="Building">Building</option>
            <option value="Mechanic">Mechanic</option>
            <option value="Others">Others</option>
          </select>
        </div>

       {/* Customer Cards */}
        <div className="grid md:grid-cols-3 gap-6">
        {filteredCustomers.map((c) => {
            // 🎨 Pick a color based on service type
            const serviceColors = {
            Electrical: "bg-yellow-100 border-yellow-400",
            Plumbing: "bg-blue-100 border-blue-400",
            Computer: "bg-green-100 border-green-400",
            Building: "bg-purple-100 border-purple-400",
            Mechanic: "bg-red-100 border-red-400",
            Others: "bg-gray-100 border-gray-400",
            };

            const cardColor = serviceColors[c.serviceType] || "bg-white border-gray-300";

            return (
            <div
                key={c._id}
                className={`shadow-lg rounded-lg p-6 hover:shadow-xl transition border-2 ${cardColor}`}
            >
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{c.name}</h2>
                <p className="text-gray-700 mb-1">
                <span className="font-semibold">Company:</span> {c.companyName}
                </p>
                <p className="text-gray-700 mb-1">
                <span className="font-semibold">Email:</span> {c.email}
                </p>
                <p className="text-gray-700 mb-1">
                <span className="font-semibold">Phone:</span> {c.phone}
                </p>
                <p className="text-gray-700 mb-1">
                <span className="font-semibold">Service:</span>{" "}
                <span className="font-bold">{c.serviceType}</span>
                </p>
                <p className="text-gray-700">
                <span className="font-semibold">City:</span> {c.city}
                </p>
            </div>
            );
        })}
        {filteredCustomers.length === 0 && (
            <p className="text-center text-gray-500 col-span-3">
            No customers found.
            </p>
        )}
        </div>
      </div>
    </div>
  );
};

export default Service;
