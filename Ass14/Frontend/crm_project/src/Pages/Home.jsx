import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Banner Section */}
      <div className="relative bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Customer Relationship Portal
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Manage your customers, track interactions, and grow relationships with ease.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2">📊 Dashboard</h2>
            <p className="text-gray-600">
              Get a quick overview of customer activities and insights.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2">👥 Customers</h2>
            <p className="text-gray-600">
              Manage customer profiles and relationship history.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2">📅 Tasks</h2>
            <p className="text-gray-600">
              Stay on top of meetings, follow-ups, and reminders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home