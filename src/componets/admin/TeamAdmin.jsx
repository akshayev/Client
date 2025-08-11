import React from 'react';
import AdminCrudController from './AdminCrudController';
import AdminInput from './AdminInput';
import { FiUsers, FiImage, FiInstagram, FiEdit, FiTrash2 } from 'react-icons/fi';
// 1. Define how a single list item looks
const TeamListItem = ({ item, onEdit, onDelete }) => (
<div className="flex items-center justify-between bg-neutral-800 p-4 rounded-lg">
<div className="flex items-center gap-4">
<img src={item.imageLink || 'https://via.placeholder.com/50'} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
<div>
<p className="font-bold text-white">{item.name}</p>
<a href={item.instagramLink} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-sky-400">
{item.instagramLink.replace('https://www.instagram.com/', '@')}
</a>
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
// 3. The main component now just uses the controller
const TeamAdmin = ({ items, setItems }) => {
return (
<AdminCrudController
title="Team Members"
items={items}
setItems={setItems}
FormComponent={TeamForm}
ListItemComponent={TeamListItem}
initialFormState={{ id: null, name: '', imageLink: '', instagramLink: '' }}
/>
);
};
export default TeamAdmin;