import React from 'react';

const AdminTextArea = ({ id, label, icon, value, onChange }) => (
    <div className="relative w-full">
        <label htmlFor={id} className="block text-sm font-medium text-neutral-400 mb-2">{label}</label>
        <div className="relative flex items-start">
            <div className="absolute left-3 top-4 text-neutral-500">{icon}</div>
            <textarea
                id={id} value={value} onChange={onChange}
                className="w-full bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors py-2 pl-10 pr-4 h-24"
                placeholder={`Enter ${label.toLowerCase()}`}
            />
        </div>
    </div>
);

export default AdminTextArea;