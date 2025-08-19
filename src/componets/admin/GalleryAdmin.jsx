import React from 'react';
import AdminCrudController from './AdminCrudController.jsx';
import AdminInput from './AdminInput.jsx';
import AdminTextArea from './AdminTextArea.jsx';
import { FiLink, FiType, FiBookmark, FiFileText, FiEdit, FiTrash2 } from 'react-icons/fi';
import { galleryApi } from '../../services/api.js';


const GalleryListItem = ({ item, onEdit, onDelete }) => (
    <div className="flex items-center justify-between bg-neutral-800 p-4 rounded-lg">
        <div className="flex items-center gap-4">
            <img src={item.imageUrl || 'https://via.placeholder.com/50'} alt={item.title} className="w-12 h-12 rounded-md object-cover" />
            <div>
                <p className="font-bold text-white">{item.title}</p>
                <p className="text-sm text-neutral-400">{item.category}</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <button onClick={() => onEdit(item)} className="text-neutral-400 hover:text-sky-400"><FiEdit size={18} /></button>
            <button onClick={() => onDelete(item.id)} className="text-neutral-400 hover:text-red-500"><FiTrash2 size={18} /></button>
        </div>
    </div>
);

const GalleryForm = ({ currentItem, setCurrentItem }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdminInput id="g-url" label="Image URL" icon={<FiLink />} value={currentItem.imageUrl} onChange={e => setCurrentItem({ ...currentItem, imageUrl: e.target.value })} />
        <AdminInput id="g-title" label="Title" icon={<FiType />} value={currentItem.title} onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} />
        <AdminInput id="g-cat" label="Category" icon={<FiBookmark />} value={currentItem.category} onChange={e => setCurrentItem({ ...currentItem, category: e.target.value })} />
        <div className="md:col-span-2">
            <AdminTextArea id="g-desc" label="Description" icon={<FiFileText />} value={currentItem.description} onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })} />
        </div>
    </div>
);


const GalleryAdmin = ({ items, onDataChange }) => {
    return (
        <AdminCrudController
            title="Gallery"
            items={items}
            FormComponent={GalleryForm}
            ListItemComponent={GalleryListItem}
            initialFormState={{ id: null, title: '', imageUrl: '', category: '', description: '' }}
            api={galleryApi}
            onDataChange={onDataChange}
            // No mapping needed as the form uses the API field names
        />
    );
};

export default GalleryAdmin;