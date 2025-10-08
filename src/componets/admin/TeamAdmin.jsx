// src/components/admin/TeamAdmin.jsx

import React, { useState, useEffect } from 'react';
import { FiUser, FiBriefcase, FiImage, FiInstagram, FiEdit, FiTrash2, FiLoader } from 'react-icons/fi';
import { teamApi } from '../../services/api.js';

import AdminCrudController from './AdminCrudController.jsx';
import AdminInput from './AdminInput.jsx';

// --- Team-Specific Components ---

const TeamListItem = ({ item, onEdit, onDelete }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-800/50 p-4 rounded-lg gap-4 border border-slate-700">
        <div className="flex items-center gap-4">
            <img 
                src={item.photoUrl || 'https://placehold.co/50x50'} 
                alt={item.name} 
                className="w-14 h-14 rounded-full object-cover bg-slate-700"
            />
            <div>
                <p className="font-bold text-white">{item.name}</p>
                {/* Conditionally render position only if it exists */}
                {item.position && <p className="text-sm text-sky-400 font-semibold">{item.position}</p>}
            </div>
        </div>
        <div className="flex items-center gap-4 self-end sm:self-auto">
            <button onClick={() => onEdit(item)} className="text-slate-400 hover:text-sky-400 transition-colors"><FiEdit size={18} /></button>
            <button onClick={() => onDelete(item.id)} className="text-slate-400 hover:text-red-500 transition-colors"><FiTrash2 size={18} /></button>
        </div>
    </div>
);

// This form now includes all relevant fields from your API response
const TeamForm = ({ currentItem, setCurrentItem }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminInput id="team-name" label="Name" icon={<FiUser />} value={currentItem.name || ''} onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })} required />
        <AdminInput id="team-position" label="Position (e.g., Lead)" icon={<FiBriefcase />} value={currentItem.position || ''} onChange={e => setCurrentItem({ ...currentItem, position: e.target.value })} />
        <div className="md:col-span-2">
            <AdminInput id="team-photo" label="Member's Photo URL" icon={<FiImage />} value={currentItem.photoUrl || ''} onChange={e => setCurrentItem({ ...currentItem, photoUrl: e.target.value })} required />
        </div>
        <div className="md:col-span-2">
            <AdminInput id="team-instagram" label="Instagram Link" icon={<FiInstagram />} value={currentItem.instagramLink || ''} onChange={e => setCurrentItem({ ...currentItem, instagramLink: e.target.value })} />
        </div>
    </div>
);


// --- Main Admin Component ---

const TeamAdmin = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await teamApi.getAll();
            // --- FIX APPLIED HERE ---
            // The data is a direct array within response.data.data
            setItems(response.data.data);
        } catch (err) {
            setError('Failed to fetch team members.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    // Map the field names for create/update operations to match the backend API
    const apiWithMapping = {
        ...teamApi,
        create: (data) => teamApi.create({
            ...data,
            image_url: data.photoUrl, // Map photoUrl -> image_url
            social_links: { instagram: data.instagramLink } // Structure social links correctly
        }),
        update: (id, data) => teamApi.update(id, {
            ...data,
            image_url: data.photoUrl, // Map photoUrl -> image_url
            social_links: { instagram: data.instagramLink } // Structure social links correctly
        }),
    };
    
    if (loading && !items.length) return <div className="flex justify-center items-center h-40"><FiLoader className="animate-spin text-sky-500" size={40} /></div>;
    if (error) return <div className="p-4 bg-red-900/50 text-red-300 rounded-md">{error}</div>;

    return (
        <div>
            <AdminCrudController
                title="Team Members"
                items={items}
                FormComponent={TeamForm}
                ListItemComponent={TeamListItem}
                initialFormState={{
                    id: null,
                    name: '',
                    position: '',
                    photoUrl: '', // Use the API's field name for consistency
                    instagramLink: '',
                }}
                api={apiWithMapping}
                onDataChange={fetchData} // Refresh by calling the same function
            />
            {/* No PaginationControls are needed as the data is not paginated */}
        </div>
    );
};

export default TeamAdmin;