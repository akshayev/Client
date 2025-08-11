import React from 'react';
import AdminCrudController from './AdminCrudController';
import AdminInput from './AdminInput';
import AdminTextArea from './AdminTextArea';
import { FiType, FiImage, FiLink, FiFileText, FiEdit, FiTrash2, FiCalendar } from 'react-icons/fi';

// 1. How a single event is displayed in the list
const EventListItem = ({ item, onEdit, onDelete }) => (
    <div className="flex items-center justify-between bg-neutral-800 p-4 rounded-lg">
        <div className="flex items-center gap-4">
            <FiCalendar className="text-sky-400 flex-shrink-0" size={20}/>
            <div>
                <p className="font-bold text-white">{item.title}</p>
                <p className="text-sm text-neutral-400 truncate max-w-md">{item.description}</p>
            </div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
            <button onClick={() => onEdit(item)} className="text-neutral-400 hover:text-sky-400"><FiEdit size={18} /></button>
            <button onClick={() => onDelete(item.id)} className="text-neutral-400 hover:text-red-500"><FiTrash2 size={18} /></button>
        </div>
    </div>
);

// 2. The form for adding/editing an event
const EventForm = ({ currentItem, setCurrentItem }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminInput id="event-title" label="Event Title" icon={<FiType />} value={currentItem.title} onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} />
        <AdminInput id="event-image" label="Event Image URL" icon={<FiImage />} value={currentItem.imageLink} onChange={e => setCurrentItem({ ...currentItem, imageLink: e.target.value })} />
        <div className="md:col-span-2">
            <AdminInput id="event-link" label="Event Page Link" icon={<FiLink />} value={currentItem.pageLink} onChange={e => setCurrentItem({ ...currentItem, pageLink: e.target.value })} />
        </div>
        <div className="md:col-span-2">
            <AdminTextArea id="event-desc" label="Description" icon={<FiFileText />} value={currentItem.description} onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })} />
        </div>
    </div>
);

// 3. The main component using the controller
const EventsAdmin = ({ items, setItems }) => (
    <AdminCrudController
        title="Events"
        items={items}
        setItems={setItems}
        FormComponent={EventForm}
        ListItemComponent={EventListItem}
        initialFormState={{
            id: null,
            title: '',
            description: '',
            imageLink: '',
            pageLink: ''
        }}
    />
);

export default EventsAdmin;