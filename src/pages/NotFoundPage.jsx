import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';

export default function NotFoundPage() {
  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col items-center justify-center text-center p-4 font-sans">
      <div className="max-w-md">
        <FiAlertTriangle className="text-sky-500 mx-auto h-16 w-16 mb-6" />
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
          404
        </h1>
        
        <p className="mt-4 text-xl md:text-2xl font-semibold text-gray-300">
          Page Not Found
        </p>
        
        <p className="mt-4 text-base text-zinc-400">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you may have mistyped the address.
        </p>

        <Link 
          to="/" 
          className="mt-8 inline-block bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}