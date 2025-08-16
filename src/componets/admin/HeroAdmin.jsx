import React from 'react';
import AdminCrudController from './AdminCrudController';
import AdminInput from './AdminInput';
import { FiImage, FiType, FiFileText, FiEdit, FiTrash2, FiStar } from 'react-icons/fi';

const HeroListItem = ({ item, onEdit, onDelete }) => (
  <div className="flex items-center justify-between bg-neutral-800 p-4 rounded-lg">
    <div className="flex items-center gap-4">
        <FiStar className="text-sky-400" />
        <div>
            <p className="font-bold text-white">{item.title}</p>
            <p className="text-sm text-neutral-400">{item.subtitle}</p>
        </div>
    </div>
    <div className="flex items-center gap-4">
        <button onClick={() => onEdit(item)} className="text-neutral-400 hover:text-sky-400"><FiEdit size={18} /></button>
        <button onClick={() => onDelete(item.id)} className="text-neutral-400 hover:text-red-500"><FiTrash2 size={18} /></button>
    </div>
  </div>
);

const HeroForm = ({ currentItem, setCurrentItem }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <AdminInput id="hero-title" label="Title" icon={<FiType />} value={currentItem.title} onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} />
    <AdminInput id="hero-image" label="Hero Image URL" icon={<FiImage />} value={currentItem.imageLink} onChange={e => setCurrentItem({ ...currentItem, imageLink: e.target.value })} />
    <div className="md:col-span-2">
        <AdminInput id="hero-subtitle" label="Subtitle" icon={<FiFileText />} value={currentItem.subtitle} onChange={e => setCurrentItem({ ...currentItem, subtitle: e.target.value })} />
    </div>
  </div>
);

const HeroAdmin = ({ items, setItems }) => (
  <AdminCrudController
    title="Hero Banners"
    items={items}
    setItems={setItems}
    FormComponent={HeroForm}
    ListItemComponent={HeroListItem}
    initialFormState={{ id: null, title: '', subtitle: '', imageLink: '' }}
  />
);

export default HeroAdmin;