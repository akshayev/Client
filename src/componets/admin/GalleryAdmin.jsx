// src/components/admin/GalleryAdmin.jsx

import React, { useState, useEffect } from 'react';
import { FiLink, FiType, FiBookmark, FiFileText, FiEdit, FiTrash2, FiLoader } from 'react-icons/fi';

import AdminCrudController from './AdminCrudController.jsx';
import AdminInput from './AdminInput.jsx';
import AdminTextArea from './AdminTextArea.jsx';
import { galleryApi } from '../../services/api.js';

// Reusable Pagination Controls (can be moved to a shared file)
const PaginationControls = ({ paginationInfo, onPageChange }) => {
    if (!paginationInfo || paginationInfo.totalPages <= 1) return null;
    return (
        <div className="flex justify-between items-center mt-6">
            <button onClick={() => onPageChange(paginationInfo.currentPage - 1)} disabled={!paginationInfo.hasPrevPage} className="px-4 py-2 bg-slate-700 rounded-md text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors">Previous</button>
            <span className="text-sm text-slate-400">Page {paginationInfo.currentPage} of {paginationInfo.totalPages}</span>
            <button onClick={() => onPageChange(paginationInfo.currentPage + 1)} disabled={!paginationInfo.hasNextPage} className="px-4 py-2 bg-slate-700 rounded-md text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors">Next</button>
        </div>
    );
};

// --- Gallery Specific Components ---

const GalleryListItem = ({ item, onEdit, onDelete }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-800/50 p-4 rounded-lg gap-4 border border-slate-700">
        <div className="flex items-center gap-4">
            <img src={item.imageUrl} alt={item.title} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
            <div>
                <p className="font-bold text-white break-all">{item.title}</p>
                <p className="text-sm text-slate-400">{item.category}</p>
            </div>
        </div>
        <div className="flex items-center gap-4 self-end sm:self-auto">
            <button onClick={() => onEdit(item)} className="text-slate-400 hover:text-sky-400 transition-colors"><FiEdit size={18} /></button>
            <button onClick={() => onDelete(item.id)} className="text-slate-400 hover:text-red-500 transition-colors"><FiTrash2 size={18} /></button>
        </div>
    </div>
);

const GalleryForm = ({ currentItem, setCurrentItem }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminInput id="g-title" label="Title" icon={<FiType />} value={currentItem.title} onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} />
        <AdminInput id="g-cat" label="Category" icon={<FiBookmark />} value={currentItem.category} onChange={e => setCurrentItem({ ...currentItem, category: e.target.value })} />
        <div className="md:col-span-2">
            <AdminInput id="g-url" label="Image URL" icon={<FiLink />} value={currentItem.imageUrl} onChange={e => setCurrentItem({ ...currentItem, imageUrl: e.target.value })} />
        </div>
        <div className="md:col-span-2">
            <AdminTextArea id="g-desc" label="Description" icon={<FiFileText />} value={currentItem.description} onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })} />
        </div>
    </div>
);


const GalleryAdmin = () => {
    const [items, setItems] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchItems = async (page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const response = await galleryApi.getAll(page, 10); // Fetch 10 items per page
            // The gallery response nests items under `response.data.data.items`
            setItems(response.data.data.items);
            setPaginationInfo(response.data.data.pagination);
            setCurrentPage(page);
        } catch (err) {
            setError('Failed to fetch gallery items.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems(1);
    }, []);

    const handlePageChange = (newPage) => {
        if (paginationInfo && newPage > 0 && newPage <= paginationInfo.totalPages) {
            fetchItems(newPage);
        }
    };

    // --- FIX: Remap field names to match API expectations (snake_case) ---
    const apiWithRemapping = {
        ...galleryApi,
        create: (data) => galleryApi.create({
            ...data,
            image_url: data.imageUrl, // Map to image_url
        }),
        update: (id, data) => galleryApi.update(id, {
            ...data,
            image_url: data.imageUrl, // Map to image_url
        })
    };

    if (loading && !items.length) return <div className="flex justify-center items-center h-40"><FiLoader className="animate-spin text-sky-500" size={40} /></div>;
    if (error) return <div className="bg-red-900/50 text-red-300 p-3 rounded-md">{error}</div>;

    return (
        <div>
            <AdminCrudController
                title="Gallery"
                items={items}
                FormComponent={GalleryForm}
                ListItemComponent={GalleryListItem}
                // Use camelCase for the form's state
                initialFormState={{ id: null, title: '', imageUrl: '', category: '', description: '' }}
                // Use the remapped API object for create/update calls
                api={apiWithRemapping}
                onDataChange={() => fetchItems(currentPage)}
            />
            <PaginationControls paginationInfo={paginationInfo} onPageChange={handlePageChange} />
        </div>
    );
};

export default GalleryAdmin;