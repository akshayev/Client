import React, { useState, useEffect } from 'react';
import { FiLink, FiType, FiEdit, FiTrash2, FiFilm, FiCalendar, FiFileText, FiList, FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import AdminCrudController from './AdminCrudController.jsx';
import AdminInput from './AdminInput.jsx';
import AdminTextArea from './AdminTextArea.jsx';
import { videoApi, eventsApi, usersApi } from '../../services/api.js';

// --- (No changes to helper components or the VideoForm/VideoListItem) ---
const FormToggle = ({ label, enabled, onChange, icon }) => ( <div><label className="block text-sm font-medium text-slate-400 mb-2">{label}</label><button type="button" onClick={onChange} className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold transition-all w-full border ${ enabled ? 'bg-green-500/20 border-green-500 text-green-300' : 'bg-slate-700/50 border-slate-600 text-slate-300' }`}>{icon}{enabled ? 'Active' : 'Inactive'}</button></div>);
const getYouTubeThumbnail = (url) => { if (!url || typeof url !== 'string') return 'https://placehold.co/150x84/1e293b/94a3b8?text=Video'; let videoId; try { const urlObj = new URL(url); videoId = urlObj.hostname === 'youtu.be' ? urlObj.pathname.slice(1) : urlObj.searchParams.get('v'); if (videoId) return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`; } catch (e) {} return 'https://placehold.co/150x84/1e293b/94a3b8?text=Video'; };
const VideoListItem = ({ item, onEdit, onDelete }) => ( <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-slate-700"> <div className="flex items-center gap-4 min-w-0"> <img src={getYouTubeThumbnail(item.videoLink)} alt={item.title} className="w-24 h-16 rounded-md object-cover bg-slate-700 flex-shrink-0" /> <div className="flex-grow min-w-0"> <p className="font-bold text-white truncate">{item.title}</p> {item.event_name && <p className="text-xs text-slate-400">Event: {item.event_name}</p>} <div className={`flex items-center gap-2 mt-1 text-xs ${item.isActive ? 'text-green-400' : 'text-slate-500'}`}>{item.isActive ? <FiEye/> : <FiEyeOff/>} <span>{item.isActive ? 'Visible' : 'Hidden'}</span></div> </div> </div> <div className="flex items-center gap-4 flex-shrink-0"><button onClick={() => onEdit(item)} className="text-slate-400 hover:text-sky-400 transition-colors"><FiEdit size={18} /></button><button onClick={() => onDelete(item.id)} className="text-slate-400 hover:text-red-500 transition-colors"><FiTrash2 size={18} /></button></div> </div> );
const VideoForm = ({ currentItem, setCurrentItem, events, users, loadingEvents, loadingUsers }) => ( <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> <AdminInput id="vid-title" label="Video Title" icon={<FiType />} value={currentItem.title || ''} onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} /> <AdminInput id="vid-link" label="YouTube Video URL" icon={<FiLink />} value={currentItem.videoLink || ''} onChange={e => setCurrentItem({ ...currentItem, videoLink: e.target.value })} /> <div className="md:col-span-2"> <AdminTextArea id="vid-desc" label="Description" icon={<FiFileText />} value={currentItem.description || ''} onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })} /> </div> <div> <label htmlFor="vid-event" className="block text-sm font-medium text-slate-400 mb-2">Associate with Event (Optional)</label> <div className="relative flex items-center"> <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><FiCalendar /></div> <select id="vid-event" value={currentItem.eventId || ''} onChange={e => setCurrentItem({ ...currentItem, eventId: e.target.value })} disabled={loadingEvents} className="w-full bg-slate-800 border border-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors py-2 pl-10 pr-4 appearance-none"> <option value="">{loadingEvents ? 'Loading events...' : 'None'}</option> {Array.isArray(events) && events.map(event => ( <option key={event.id} value={event.id}>{event.title}</option> ))} </select> </div> </div> <div> <label htmlFor="vid-user" className="block text-sm font-medium text-slate-400 mb-2">Associate with User (Optional)</label> <div className="relative flex items-center"> <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><FiUser /></div> <select id="vid-user" value={currentItem.userId || ''} onChange={e => setCurrentItem({ ...currentItem, userId: e.target.value })} disabled={loadingUsers} className="w-full bg-slate-800 border border-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors py-2 pl-10 pr-4 appearance-none"> <option value="">{loadingUsers ? 'Loading users...' : 'None'}</option> {Array.isArray(users) && users.map(user => ( <option key={user.id} value={user.id}>{user.username}</option> ))} </select> </div> </div> <AdminInput id="vid-order" label="Order Index" type="number" icon={<FiList />} value={currentItem.orderIndex !== undefined ? currentItem.orderIndex : 0} onChange={e => setCurrentItem({ ...currentItem, orderIndex: parseInt(e.target.value, 10) || 0 })} /> <FormToggle label="Status" enabled={!!currentItem.isActive} onChange={() => setCurrentItem({ ...currentItem, isActive: !currentItem.isActive })} icon={currentItem.isActive ? <FiEye /> : <FiEyeOff />} /> </div> );


const VideoAdmin = ({ items, onDataChange }) => {
    const [events, setEvents] = useState([]); const [users, setUsers] = useState([]); const [loadingEvents, setLoadingEvents] = useState(true); const [loadingUsers, setLoadingUsers] = useState(true);
    useEffect(() => { const fetchDataForDropdowns = async () => { try { const [eventsResponse, usersResponse] = await Promise.all([ eventsApi.getAll(), usersApi.getAll() ]); const eventsPayload = eventsResponse.data?.data; const eventsData = Array.isArray(eventsPayload) ? eventsPayload : (eventsPayload && Array.isArray(eventsPayload.items)) ? eventsPayload.items : []; setEvents(eventsData); const usersPayload = usersResponse.data?.data; const usersData = Array.isArray(usersPayload) ? usersPayload : (usersPayload && Array.isArray(usersPayload.items)) ? usersPayload.items : (usersPayload && Array.isArray(usersPayload.data)) ? usersPayload.data : []; setUsers(usersData); } catch (error) { console.error("Failed to fetch data for dropdowns:", error); } finally { setLoadingEvents(false); setLoadingUsers(false); } }; fetchDataForDropdowns(); }, []);
    const CustomForm = (props) => ( <VideoForm {...props} events={events} users={users} loadingEvents={loadingEvents} loadingUsers={loadingUsers} /> );
    const validateVideoForm = (item) => { if (!item.title || item.title.trim() === '') { return 'Video Title is a required field.'; } if (!item.videoLink || item.videoLink.trim() === '') { return 'YouTube Video URL is a required field.'; } try { new URL(item.videoLink); } catch (_) { return 'The Video URL is not a valid URL.'; } if (item.orderIndex < 0) { return 'Order Index cannot be a negative number.' } return null; };

    return (
        <AdminCrudController
            title="Video Management"
            items={items}
            FormComponent={CustomForm}
            ListItemComponent={VideoListItem}
            validateForm={validateVideoForm}
            initialFormState={{
                id: null, title: '', description: '', videoLink: '', isActive: true,
                orderIndex: 0, eventId: '', userId: ''
            }}
            api={videoApi}
            onDataChange={onDataChange}
            mapFromApi={item => ({
                id: item.id, title: item.title, description: item.description, videoLink: item.videoLink,
                isActive: item.isActive, orderIndex: item.orderIndex, userId: item.userId,
            })}
            mapToApi={item => {
                const selectedEvent = events.find(e => e.id === parseInt(item.eventId, 10));
                const event_name = selectedEvent ? selectedEvent.title : null;
                const title = item.title ? item.title.trim() : '';
                const description = item.description ? item.description.trim() : '';

                return {
                    id: item.id,
                    title: title,
                    description: description === '' ? null : description,
                    videoLink: item.videoLink ? item.videoLink.trim() : '',
                    isActive: item.isActive,
                    orderIndex: typeof item.orderIndex === 'number' ? item.orderIndex : 0,
                    event_name: event_name,
                    // highlight-start
                    // REMOVED: The backend gets this from the auth token, so we must not send it.
                    // userId: item.userId ? parseInt(item.userId, 10) : null,
                    // highlight-end
                };
            }}
        />
    );
};

export default VideoAdmin;