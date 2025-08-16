import React from 'react';

const AdminInput = ({ id, label, type = "text", icon, value, onChange }) => (
    <div className="relative w-full">
        <label htmlFor={id} className="block text-sm font-medium text-neutral-400 mb-2">{label}</label>
        <div className="relative flex items-center">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">{icon}</div>
            <input
                id={id} type={type} value={value} onChange={onChange}
                className="w-full bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors py-2 pl-10 pr-4"
                placeholder={`Enter ${label.toLowerCase()}`}
            />
        </div>
    </div>
);

export default AdminInput;