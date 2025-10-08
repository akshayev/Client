// src/components/admin/HeroAdmin.jsx

import React, { useState, useEffect } from 'react';
import { FiImage, FiType, FiFileText, FiEdit, FiTrash2, FiLoader } from 'react-icons/fi';
import { heroApi } from '../../services/api.js';

// Import shared admin components
import AdminCrudController from './AdminCrudController.jsx';
import AdminInput from './AdminInput.jsx';

// --- Hero Specific Sub-Components ---

const HeroListItem = ({ item, onEdit, onDelete }) => (
    // IMPROVEMENT: Added image thumbnail and a more responsive flex layout
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-800/50 p-4 rounded-lg gap-4 border border-slate-700">
        <div className="flex items-center gap-4">
            <img 
                src={item.imageUrl || 'https://via.placeholder.com/100x50'} 
                alt={item.title} 
                className="w-24 h-12 rounded-md object-cover bg-slate-700 flex-shrink-0" 
            />
            <div>
                <p className="font-bold text-white break-all">{item.title}</p>
                <p className="text-sm text-slate-400 break-all">{item.subtitle}</p>
            </div>
        </div>
        <div className="flex items-center gap-4 self-end sm:self-auto">
            <button onClick={() => onEdit(item)} className="text-slate-400 hover:text-sky-400 transition-colors"><FiEdit size={18} /></button>
            <button onClick={() => onDelete(item.id)} className="text-slate-400 hover:text-red-500 transition-colors"><FiTrash2 size={18} /></button>
        </div>
    </div>
);

const HeroForm = ({ currentItem, setCurrentItem }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminInput 
            id="hero-title" 
            label="Title" 
            icon={<FiType />} 
            value={currentItem.title} 
            onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} 
            required
        />
        {/* SIMPLIFICATION: Standardized on 'imageUrl' */}
        <AdminInput 
            id="hero-image" 
            label="Hero Image URL" 
            icon={<FiImage />} 
            value={currentItem.imageUrl} 
            onChange={e => setCurrentItem({ ...currentItem, imageUrl: e.target.value })}
            required
        />
        <div className="md:col-span-2">
            <AdminInput 
                id="hero-subtitle" 
                label="Subtitle" 
                icon={<FiFileText />} 
                value={currentItem.subtitle} 
                onChange={e => setCurrentItem({ ...currentItem, subtitle: e.target.value })} 
                required
            />
        </div>
    </div>
);

// --- Main Admin Component ---

const HeroAdmin = () => {
    // This component now fetches and manages its own state
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await heroApi.getAll();
            setItems(response.data.data);
        } catch (err) {
            console.error('Failed to fetch hero data:', err);
            setError('Could not load hero banners. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div className="flex justify-center items-center p-8"><FiLoader className="animate-spin text-sky-500" size={40} /></div>;
    if (error) return <div className="p-4 bg-red-900/50 text-red-300 rounded-md">{error}</div>;

    return (
        <AdminCrudController
            title="Hero Banners"
            items={items}
            FormComponent={HeroForm}
            ListItemComponent={HeroListItem}
            // SIMPLIFICATION: Using 'imageUrl' directly, matching the API.
            initialFormState={{ id: null, title: '', subtitle: '', imageUrl: '' }}
            api={heroApi}
            onDataChange={fetchData}
            // The mapping props are no longer needed, simplifying the component.
        />
    );
};

export default HeroAdmin;