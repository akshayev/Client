import React from 'react';
import AdminCrudController from './AdminCrudController.jsx';
import AdminInput from './AdminInput.jsx';
import { FiUsers, FiImage, FiInstagram, FiEdit, FiTrash2 } from 'react-icons/fi';
import { teamApi } from '../../services/api.js';
// 1. Define how a single list item looks (Corrected)
const TeamListItem = ({ item, onEdit, onDelete }) => (
    <div className="flex items-center justify-between bg-neutral-800 p-4 rounded-lg">
        <div className="flex items-center gap-4">
            {/* 
              FIX #1: Replaced placeholder and simplified the src attribute.
              The logic in TeamAdmin now ensures 'imageLink' is always the correct property to use here.
            */}
            <img 
                src={item.imageLink || 'https://placehold.co/50x50'} 
                alt={item.name || 'Team Member'} 
                className="w-12 h-12 rounded-full object-cover" 
            />
            <div>
                <p className="font-bold text-white">{item.name}</p>
                {item.instagramLink && (
                    <a href={item.instagramLink} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-sky-400">
                        {/* Use optional chaining for safety */}
                        {item.instagramLink?.replace('https://www.instagram.com/', '@')}
                    </a>
                )}
            </div>
        </div>
        <div className="flex items-center gap-4">
            <button onClick={() => onEdit(item)} className="text-neutral-400 hover:text-sky-400"><FiEdit size={18} /></button>
            <button onClick={() => onDelete(item.id)} className="text-neutral-400 hover:text-red-500"><FiTrash2 size={18} /></button>
        </div>
    </div>
);
// 2. Define the form fields
const TeamForm = ({ currentItem, setCurrentItem }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminInput id="team-name" label="Name" icon={<FiUsers />} value={currentItem.name} onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })} />
        <AdminInput id="team-image" label="Member's Photo URL" icon={<FiImage />} value={currentItem.imageLink} onChange={e => setCurrentItem({ ...currentItem, imageLink: e.target.value })} />
        <div className="md:col-span-2">
            <AdminInput id="team-instagram" label="Instagram Link" icon={<FiInstagram />} value={currentItem.instagramLink} onChange={e => setCurrentItem({ ...currentItem, instagramLink: e.target.value })} />
        </div>
    </div>
);

// The main component with corrected data mapping

const TeamAdmin = ({ items, onDataChange }) => {
    return (
        <AdminCrudController
            title="Team Members"
            items={items}
            FormComponent={TeamForm}
            ListItemComponent={TeamListItem} // Will use the corrected ListItem
            initialFormState={{ id: null, name: '', imageLink: '', instagramLink: '' }}
            api={teamApi}
            onDataChange={onDataChange}
            
            // FIX #2: Add mapping functions to handle the 'photoUrl' vs 'imageLink' difference
            
            // Maps FROM the API structure TO the form/UI structure
            mapFromApi={item => ({
                id: item.id,
                name: item.name,
                imageLink: item.photoUrl, // Map photoUrl -> imageLink
                instagramLink: item.instagramLink,
            })}

            // Maps FROM the form/UI structure back TO the API structure
            mapToApi={item => ({
                id: item.id,
                name: item.name,
                photoUrl: item.imageLink, // Map imageLink -> photoUrl
                instagramLink: item.instagramLink,
            })}
        />
    );
};
export default TeamAdmin;