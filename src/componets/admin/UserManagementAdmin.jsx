import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiShield, FiToggleLeft, FiToggleRight, FiEdit, FiTrash2 } from 'react-icons/fi';

import AdminCrudController from './AdminCrudController.jsx';
import AdminInput from './AdminInput.jsx';
import { usersApi } from '../../services/api.js';

// --- Reusable Toggle Switch Component ---
const ToggleSwitch = ({ enabled, onChange }) => (
    <button
        onClick={onChange}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none ${
            enabled ? 'bg-green-500' : 'bg-slate-600'
        }`}
    >
        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
            enabled ? 'translate-x-6' : 'translate-x-1'
        }`} />
    </button>
);


// 1. How a single user is displayed in the list
const UserListItem = ({ item, onEdit, onDelete, onToggleStatus }) => (
    <div className="grid grid-cols-12 items-center gap-4 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
        <div className="col-span-12 sm:col-span-4">
            <p className="font-bold text-white">{item.username}</p>
            <p className="text-sm text-slate-400">{item.email}</p>
        </div>
        <div className="col-span-6 sm:col-span-2">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                item.role === 'admin' 
                    ? 'bg-sky-500/20 text-sky-300' 
                    : 'bg-slate-600/50 text-slate-300'
            }`}>
                {item.role}
            </span>
        </div>
        <div className="col-span-6 sm:col-span-2 flex items-center gap-2">
             <ToggleSwitch enabled={item.isActive} onChange={() => onToggleStatus(item)} />
             <span className="text-sm">{item.isActive ? 'Active' : 'Inactive'}</span>
        </div>
        <div className="col-span-12 sm:col-span-4 flex items-center justify-end gap-4">
            <button onClick={() => onEdit(item)} className="text-slate-400 hover:text-sky-400 transition-colors"><FiEdit size={18} /></button>
            <button onClick={() => onDelete(item.id)} className="text-slate-400 hover:text-red-500 transition-colors"><FiTrash2 size={18} /></button>
        </div>
    </div>
);

// 2. The form for adding/editing a user
const UserForm = ({ currentItem, setCurrentItem, isEditing }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminInput 
            id="user-name" label="Username" icon={<FiUser />} 
            value={currentItem.username || ''} 
            onChange={e => setCurrentItem({ ...currentItem, username: e.target.value })} 
        />
        <AdminInput 
            id="user-email" label="Email Address" type="email" icon={<FiMail />} 
            value={currentItem.email || ''} 
            onChange={e => setCurrentItem({ ...currentItem, email: e.target.value })} 
        />
        <AdminInput 
            id="user-password" label="Password" type="password" icon={<FiLock />} 
            value={currentItem.password || ''} 
            onChange={e => setCurrentItem({ ...currentItem, password: e.target.value })}
            // Add helper text to clarify password behavior when editing
            placeholder={isEditing ? "Leave blank to keep current password" : "Enter a new password"}
        />
        <div>
            <label htmlFor="user-role" className="block text-sm font-medium text-slate-400 mb-2">Role</label>
            <div className="relative flex items-center">
                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><FiShield /></div>
                <select
                    id="user-role"
                    value={currentItem.role || 'moderator'}
                    onChange={e => setCurrentItem({ ...currentItem, role: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors py-2 pl-10 pr-4 appearance-none"
                >
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
        </div>
    </div>
);

// 3. The main component that brings everything together
const UserManagementAdmin = ({ items, onDataChange }) => {

    const [statusError, setStatusError] = useState(null);

    // Custom handler for toggling user status, as it uses a different API endpoint
    const handleToggleStatus = async (user) => {
        setStatusError(null);
        if (!window.confirm(`Are you sure you want to change status for ${user.username}?`)) {
            return;
        }

        try {
            await usersApi.updateStatus(user.id, !user.isActive);
            onDataChange(); // Refresh data from parent
        } catch (err) {
            console.error('Failed to toggle user status:', err);
            setStatusError('Could not update status. Please try again.');
        }
    };
    
    // Custom wrapper for ListItem to pass down the extra handler
    const CustomListItem = (props) => (
        <UserListItem {...props} onToggleStatus={handleToggleStatus} />
    );

    // Custom wrapper for the form to pass down the `isEditing` flag
    const CustomForm = ({currentItem, setCurrentItem, isEditing}) => (
        <UserForm 
            currentItem={currentItem} 
            setCurrentItem={setCurrentItem} 
            isEditing={isEditing}
        />
    )

    // Override the `update` and `create` methods to handle password field
    const apiWithPasswordHandling = {
        ...usersApi,
        create: (data) => {
            // Ensure password is not empty for new users
            if (!data.password) {
                return Promise.reject({ response: { data: { message: "Password is required for new users." } } });
            }
            return usersApi.create(data);
        },
        update: (id, data) => {
            // If password is blank, don't send it in the update payload
            if (data.password === '') {
                const { password, ...dataWithoutPassword } = data;
                return usersApi.update(id, dataWithoutPassword);
            }
            return usersApi.update(id, data);
        }
    }

    return (
        <div>
            {statusError && <div className="bg-red-900/50 border border-red-500 text-red-300 p-3 rounded-md mb-4 text-sm">{statusError}</div>}
            <AdminCrudController
                title="User Management"
                items={items}
                FormComponent={CustomForm}
                ListItemComponent={CustomListItem}
                initialFormState={{
                    id: null,
                    username: '',
                    email: '',
                    password: '',
                    role: 'moderator',
                    isActive: true, // Default new users to be active
                }}
                api={apiWithPasswordHandling}
                onDataChange={onDataChange}
                // No mapping needed if form state matches API model
            />
        </div>
    );
};

export default UserManagementAdmin;