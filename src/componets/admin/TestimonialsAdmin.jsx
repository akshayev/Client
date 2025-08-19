import React from 'react';
import AdminCrudController from './AdminCrudController.jsx';
import AdminInput from './AdminInput.jsx';
import AdminTextArea from './AdminTextArea.jsx';
import { FiUsers, FiImage, FiMessageSquare, FiEdit, FiTrash2 } from 'react-icons/fi';
import { testimonialsApi } from '../../services/api.js';

// 1. How a single testimonial is displayed in the list
const TestimonialListItem = ({ item, onEdit, onDelete }) => (
    <div className="flex items-center justify-between bg-neutral-800 p-4 rounded-lg">
        <div className="flex items-center gap-4">
            <img src={item.imageLink || 'https://via.placeholder.com/50'} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
            <div>
                <p className="font-bold text-white">{item.name}</p>
                <p className="text-sm text-neutral-400 italic">"{item.text.substring(0, 50)}..."</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <button onClick={() => onEdit(item)} className="text-neutral-400 hover:text-sky-400"><FiEdit size={18} /></button>
            <button onClick={() => onDelete(item.id)} className="text-neutral-400 hover:text-red-500"><FiTrash2 size={18} /></button>
        </div>
    </div>
);

// 2. The form for adding/editing a testimonial
const TestimonialForm = ({ currentItem, setCurrentItem }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminInput id="test-name" label="Name" icon={<FiUsers />} value={currentItem.name} onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })} />
        <AdminInput id="test-image" label="Image URL" icon={<FiImage />} value={currentItem.imageLink} onChange={e => setCurrentItem({ ...currentItem, imageLink: e.target.value })} />
        <div className="md:col-span-2">
            <AdminTextArea id="test-text" label="Testimonial Text" icon={<FiMessageSquare />} value={currentItem.text} onChange={e => setCurrentItem({ ...currentItem, text: e.target.value })} />
        </div>
    </div>
);

// 3. The main component using the controller

const TestimonialsAdmin = ({ items, onDataChange }) => (
    <AdminCrudController
        title="Testimonials"
        items={items}
        FormComponent={TestimonialForm}
        ListItemComponent={TestimonialListItem}
        initialFormState={{ id: null, name: '', text: '', imageLink: '' }}
        api={testimonialsApi}
        onDataChange={onDataChange}
        mapToApi={item => ({
            id: item.id,
            name: item.name,
            text: item.text,
            imageUrl: item.imageLink,
        })}
    />
);

export default TestimonialsAdmin;