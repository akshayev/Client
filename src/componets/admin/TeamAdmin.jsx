import React from 'react';
import AdminCrudController from './AdminCrudController.jsx';
import AdminInput from './AdminInput.jsx';
import { FiUsers, FiImage, FiInstagram, FiEdit, FiTrash2 } from 'react-icons/fi';
import { teamApi } from '../../services/api.js';
// 1. Define how a single list item looks
const TeamListItem = ({ item, onEdit, onDelete }) => (
    // ... (Component needs a small fix to handle missing instagramLink)
    <div className="flex items-center justify-between bg-neutral-800 p-4 rounded-lg">
        <div className="flex items-center gap-4">
            <img src={item.photoUrl || item.imageLink || 'https://via.placeholder.com/50'} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
            <div>
                <p className="font-bold text-white">{item.name}</p>
                {item.instagramLink && (
                    <a href={item.instagramLink} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-sky-400">
                        {item.instagramLink.replace('https://www.instagram.com/', '@')}
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

const TeamAdmin = ({ items, onDataChange }) => {
    return (
        <AdminCrudController
            title="Team Members"
            items={items}
            FormComponent={TeamForm}
            ListItemComponent={TeamListItem}
            initialFormState={{ id: null, name: '', imageLink: '', instagramLink: '' }}
            api={teamApi}
            onDataChange={onDataChange}
            mapToApi={item => ({
                id: item.id,
                name: item.name,
                photoUrl: item.imageLink, // Map to API field name
                instagramLink: item.instagramLink,
            })}
        />
    );
};
export default TeamAdmin;