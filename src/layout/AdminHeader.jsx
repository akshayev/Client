import React from 'react';
import { FiMenu } from 'react-icons/fi';

const AdminHeader = ({ pageTitle, setIsSidebarOpen }) => {
    return (
        <header className="sticky top-0 z-10 flex items-center justify-between w-full h-16 px-4 md:px-8 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700">
            {/* Hamburger Menu for Mobile */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 text-slate-300 hover:text-white md:hidden"
                aria-label="Open sidebar"
            >
                <FiMenu size={24} />
            </button>
            
            {/* Page Title */}
            <h2 className="text-xl font-bold text-white ml-2 md:ml-0">{pageTitle}</h2>

            {/* Can add user profile/avatar here in the future */}
            <div className="flex items-center">
                {/* Example: <div className="w-8 h-8 bg-slate-600 rounded-full"></div> */}
            </div>
        </header>
    );
};

export default AdminHeader;