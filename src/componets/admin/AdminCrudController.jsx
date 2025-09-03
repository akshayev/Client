import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiX } from 'react-icons/fi';

const AdminCrudController = ({
  title,
  items,
  FormComponent,
  ListItemComponent,
  initialFormState,
  api,
  onDataChange,
  mapToApi,
  mapFromApi,
  validateForm,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentItem(initialFormState);
    setIsFormVisible(true);
    setError(null);
  };
  const handleEdit = (item) => {
    setIsEditing(true);
    const mappedItem = mapFromApi ? mapFromApi(item) : item;
    setCurrentItem({ ...mappedItem });
    setIsFormVisible(true);
    setError(null);
  };
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        setIsLoading(true);
        await api.delete(id);
        onDataChange();
      } catch (err) {
        console.error('Failed to delete item:', err);
        setError('Failed to delete item. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async () => {
    setError(null);
    if (validateForm) {
      const validationError = validateForm(currentItem);
      if (validationError) {
        setError(validationError);
        return;
      }
    }
    setIsLoading(true);
    const fullData = mapToApi ? mapToApi(currentItem) : currentItem;
    const { id, ...payload } = fullData;
    console.log("Data being sent to API:", payload);

    try {
      if (isEditing) {
        await api.update(id, payload);
      } else {
        await api.create(payload);
      }
      onDataChange();
      handleCloseForm();
    } catch (err) {
      console.error('Failed to save item:', err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'An unknown error occurred.';
      setError(`Failed to save: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setIsEditing(false);
    setCurrentItem(initialFormState);
    setError(null);
  };

  const formVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <div className="bg-slate-900/50 p-6 md:p-8 rounded-xl border border-slate-700/50">
       <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <button
          onClick={handleAddNew}
          className="bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
        >
          <FiPlus /> Add New
        </button>
      </div>
      <AnimatePresence>
        {isFormVisible && (
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-8 p-6 bg-slate-800/80 rounded-lg relative border border-slate-700"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-lg">{isEditing ? `Edit ${title.slice(0, -1)}` : `Add New ${title.slice(0, -1)}`}</h4>
              <button onClick={handleCloseForm} className="text-slate-500 hover:text-white"><FiX /></button>
            </div>
            {error && <div className="bg-red-900/50 border border-red-500 text-red-300 p-3 rounded-md mb-4 text-sm">{error}</div>}
            
            <FormComponent 
                currentItem={currentItem} 
                setCurrentItem={setCurrentItem} 
                isEditing={isEditing} 
            />

            <button
              onClick={handleSave}
              disabled={isLoading}
              className="mt-6 bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : (isEditing ? 'Update Item' : 'Save New Item')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="space-y-4">
        {items.length > 0 ? (
          items.map(item => (
            // highlight-start
            // --- THIS IS THE CORRECTED LINE ---
            <ListItemComponent key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
            // highlight-end
          ))
        ) : (
          <p className="text-slate-500 text-center py-4">No items yet. Click "Add New" to get started.</p>
        )}
      </div>
    </div>
  );
};

export default AdminCrudController;