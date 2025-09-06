import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { alumniData } from "../data/alumni_data.js";
import AlumniCard from "../componets/alumni/AlumniCard.jsx"; // Ensure path is correct

const ALUMNI_PER_PAGE = 8;

const Alumni = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Memoize years for performance
  const years = useMemo(() => ["All", ...[...new Set(alumniData.map((a) => a.batch))].sort((a, b) => b - a)], []);

  // Memoize filtered alumni for performance
  const filteredAlumni = useMemo(() => {
    return alumniData
      .filter((alumni) => selectedYear === "All" || alumni.batch.toString() === selectedYear)
      .filter((alumni) => {
        const term = searchTerm.toLowerCase();
        return (
          alumni.name.toLowerCase().includes(term) ||
          alumni.role.toLowerCase().includes(term)
        );
      });
  }, [searchTerm, selectedYear]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredAlumni.length / ALUMNI_PER_PAGE);
  const paginatedAlumni = filteredAlumni.slice(
    (currentPage - 1) * ALUMNI_PER_PAGE,
    currentPage * ALUMNI_PER_PAGE
  );

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  // Mouse move handler for background gradient effect
  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    currentTarget.style.setProperty("--mouse-x", `${clientX}px`);
    currentTarget.style.setProperty("--mouse-y", `${clientY}px`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full bg-neutral-950 text-white p-4 sm:p-8 font-sans relative 
                 before:pointer-events-none before:fixed before:inset-0 before:z-0
                 before:bg-[radial-gradient(circle_farthest-side_at_var(--mouse-x)_var(--mouse-y),_rgba(37,99,235,0.15),_transparent_50%)]"
    >
      <div className="max-w-7xl mx-auto relative z-10 mt-20 mb-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 pb-2">
            Our Esteemed Alumni
          </h1>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
            Explore the achievements and journeys of our talented graduates.
          </p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col gap-8 mb-16 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search by name or role..."
            className="w-full bg-neutral-900 border-2 border-neutral-800 rounded-lg px-5 py-3 text-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset page on new search
            }}
          />
          <div className="flex justify-center items-center flex-wrap gap-3">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => {
                  setSelectedYear(year);
                  setCurrentPage(1); // Reset page on filter change
                }}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  selectedYear === year
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                }`}
              >
                {year === "All" ? "All Years" : year}
              </button>
            ))}
          </div>
        </div>
        
        <hr className="border-neutral-800 max-w-5xl mx-auto mb-16" />

        {/* Alumni Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + selectedYear + searchTerm} // Re-trigger animation on data change
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {paginatedAlumni.length > 0 ? (
              paginatedAlumni.map((alumni) => <AlumniCard key={alumni.id} alumni={alumni} />)
            ) : (
              <p className="col-span-full text-center text-neutral-400 text-lg py-16">
                No alumni found with the current filters.
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-20 space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-neutral-800 hover:bg-neutral-700 disabled:bg-neutral-900 disabled:text-neutral-600 disabled:cursor-not-allowed text-white font-bold py-2 px-5 rounded-lg transition-colors"
            >
              Previous
            </button>
            <span className="text-neutral-400 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-neutral-800 hover:bg-neutral-700 disabled:bg-neutral-900 disabled:text-neutral-600 disabled:cursor-not-allowed text-white font-bold py-2 px-5 rounded-lg transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alumni;