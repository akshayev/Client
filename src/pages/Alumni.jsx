import React from "react";
import { alumniData } from "../data/alumni_data";

const Alumni = () => {
  return (
    <div className="min-h-screen bg-black text-white px-8 py-12">
      {}
      <h1 className="text-4xl font-bold text-center mb-6 relative inline-block mx-auto block">
        Our Alumni
        <span className="block w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full"></span>
      </h1>

      {}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {alumniData.map((alumni) => (
          <div
            key={alumni.id}
            className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 shadow-md hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transform transition-all duration-300"
          >
            <img
              src={alumni.photo}
              alt={alumni.name}
              className="w-28 h-28 object-cover rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-md"
            />
            <h2 className="text-xl font-semibold text-center">{alumni.name}</h2>
            <p className="text-sm text-center text-gray-400">
              Batch {alumni.batch}
            </p>
            <p className="text-center mt-2 text-gray-300">{alumni.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alumni;
