import React from 'react';
import AdminCrudController from './AdminCrudController';
import AdminInput from './AdminInput';
import { FiInstagram, FiImage, FiEdit, FiTrash2, FiLink } from 'react-icons/fi';

// 1. How a single Instagram post is displayed in the list
const InstagramListItem = ({ item, onEdit, onDelete }) => (
    <div className="flex items-center justify-between bg-neutral-800 p-4 rounded-lg">
        <div className="flex items-center gap-4">
            <img src={item.imageLink || 'https://via.placeholder.com/150/111827/FFFFFF?text=Insta'} alt="Instagram Post" className="w-12 h-12 rounded-md object-cover" />
            <div>
                <p className="font-bold text-white">Instagram Post</p>
                <a href={item.postLink} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-sky-400 flex items-center gap-1">
                    <FiLink size={12}/> {item.postLink.substring(0, 40)}...
                </a>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <button onClick={() => onEdit(item)} className="text-neutral-400 hover:text-sky-400"><FiEdit size={18} /></button>
            <button onClick={() => onDelete(item.id)} className="text-neutral-400 hover:text-red-500"><FiTrash2 size={18} /></button>
        </div>
    </div>
);

// 2. The form for adding/editing an Instagram post
const InstagramForm = ({ currentItem, setCurrentItem }) => (
    <div className="space-y-6">
        <AdminInput
            id="insta-link"
            label="Instagram Post URL"
            icon={<FiInstagram />}
            value={currentItem.postLink}
            onChange={e => setCurrentItem({ ...currentItem, postLink: e.target.value })}
        />
        <AdminInput
            id="insta-image"
            label="Custom Image URL (Optional)"
            icon={<FiImage />}
            value={currentItem.imageLink}
            onChange={e => setCurrentItem({ ...currentItem, imageLink: e.target.value })}
        />
    </div>
);

// 3. The main component using the controller
const InstagramAdmin = ({ items, setItems }) => (
    <AdminCrudController
        title="Instagram Posts"
        items={items}
        setItems={setItems}
        FormComponent={InstagramForm}
        ListItemComponent={InstagramListItem}
        initialFormState={{
            id: null,
            postLink: '',
            imageLink: ''
        }}
    />
);

export default InstagramAdmin;