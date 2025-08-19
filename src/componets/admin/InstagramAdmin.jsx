import React from 'react';
import AdminCrudController from './AdminCrudController.jsx';
import AdminInput from './AdminInput.jsx';
import { FiInstagram, FiImage, FiEdit, FiTrash2, FiLink } from 'react-icons/fi';
import { instagramApi } from '../../services/api.js';

const InstagramListItem = ({ item, onEdit, onDelete }) => (
    <div className="flex items-center justify-between bg-neutral-800 p-4 rounded-lg">
        <div className="flex items-center gap-4">
            <img src={item.imageUrl || item.imageLink || 'https://via.placeholder.com/150/111827/FFFFFF?text=Insta'} alt="Instagram Post" className="w-12 h-12 rounded-md object-cover" />
            <div>
                <p className="font-bold text-white">Instagram Post</p>
                {item.postUrl && (
                    <a href={item.postUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-sky-400 flex items-center gap-1">
                        <FiLink size={12}/> {item.postUrl.substring(0, 40)}...
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

const InstagramForm = ({ currentItem, setCurrentItem }) => (
    // ... (This component used `postLink` and `imageLink`, let's update it to match state)
     <div className="space-y-6">
        <AdminInput
            id="insta-link"
            label="Instagram Post URL"
            icon={<FiInstagram />}
            value={currentItem.postUrl || ''}
            onChange={e => setCurrentItem({ ...currentItem, postUrl: e.target.value })}
        />
        <AdminInput
            id="insta-image"
            label="Custom Image URL (Optional)"
            icon={<FiImage />}
            value={currentItem.imageUrl || ''}
            onChange={e => setCurrentItem({ ...currentItem, imageUrl: e.target.value })}
        />
    </div>
);

const InstagramAdmin = ({ items, onDataChange }) => (
    <AdminCrudController
        title="Instagram Posts"
        items={items}
        FormComponent={InstagramForm}
        ListItemComponent={InstagramListItem}
        initialFormState={{ id: null, postUrl: '', imageUrl: '' }}
        api={instagramApi}
        onDataChange={onDataChange}
        // No mapping needed as we adjusted the form to use API field names
    />
);

export default InstagramAdmin;