import React from 'react';
import AdminInput from './AdminInput';
import AdminTextArea from './AdminTextArea';
import AdminSection from './AdminSection';
import { FiLink, FiType, FiBookmark, FiFileText, FiTrash2, FiPlus } from 'react-icons/fi';

const GalleryAdmin = ({ items, setItems, onSave }) => {
    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };
    const addItem = () => setItems([...items, { url: '', title: '', category: '', description: '' }]);
    const removeItem = (index) => {
        if (items.length > 1) setItems(items.filter((_, i) => i !== index));
    };

    return (
        <AdminSection title="Gallery" onSave={onSave}>
            {items.map((item, index) => (
                <div key={index} className="bg-neutral-800/60 p-5 rounded-lg border border-neutral-700">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold text-lg">Gallery Item {index + 1}</h4>
                        <button onClick={() => removeItem(index)} disabled={items.length === 1} className="text-neutral-500 hover:text-red-500 disabled:opacity-50"><FiTrash2 size={20} /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AdminInput id={`g-url-${index}`} label="Image URL" icon={<FiLink />} value={item.url} onChange={e => handleItemChange(index, 'url', e.target.value)} />
                        <AdminInput id={`g-title-${index}`} label="Title" icon={<FiType />} value={item.title} onChange={e => handleItemChange(index, 'title', e.target.value)} />
                        <AdminInput id={`g-cat-${index}`} label="Category" icon={<FiBookmark />} value={item.category} onChange={e => handleItemChange(index, 'category', e.target.value)} />
                        <div className="md:col-span-2">
                            <AdminTextArea id={`g-desc-${index}`} label="Description" icon={<FiFileText />} value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} />
                        </div>
                    </div>
                </div>
            ))}
            <button onClick={addItem} className="mt-2 text-sky-400 hover:text-sky-300 flex items-center gap-2 font-semibold"><FiPlus /> Add Another Item</button>
        </AdminSection>
    );
};

export default GalleryAdmin;