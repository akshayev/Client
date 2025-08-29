import React, { useState } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import { FiPlus, FiX } from 'react-icons/fi';

const AdminCrudController = ({
  title,
  items,
  FormComponent,
  ListItemComponent,
  initialFormState,
  api, // The specific API service (e.g., heroApi, teamApi)
  onDataChange, // Function to refetch data after a change
  mapToApi, // Optional function to map frontend state to API format
  mapFromApi, // Optional function to map API data to frontend format
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
    // Use mapFromApi if provided, otherwise use the item as is
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
        onDataChange(); // Refetch data
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
    setIsLoading(true);

    // If a mapping function is provided, use it. Otherwise, use the item as is.
    const dataToSave = mapToApi ? mapToApi(currentItem) : currentItem;

    try {
      if (isEditing) {
        // The API needs the ID for the endpoint, but not in the body
        const { id, ...updateData } = dataToSave;
        await api.update(id, updateData);
      } else {
        await api.create(dataToSave);
      }
      onDataChange(); // Refetch data
      handleCloseForm();
    } catch (err) {
      console.error('Failed to save item:', err);
      const errorMessage = err.response?.data?.message || 'An unknown error occurred.';
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
    <div className="bg-neutral-900/50 p-6 md:p-8 rounded-xl border border-white/10">
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
            className="mb-8 p-6 bg-neutral-800 rounded-lg relative"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-lg">{isEditing ? 'Edit Item' : 'Add New Item'}</h4>
              <button onClick={handleCloseForm} className="text-neutral-500 hover:text-white"><FiX /></button>
            </div>
            {error && <div className="bg-red-900/50 border border-red-500 text-red-300 p-3 rounded-md mb-4 text-sm">{error}</div>}
            <FormComponent currentItem={currentItem} setCurrentItem={setCurrentItem} />
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="mt-6 bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:bg-neutral-600 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : (isEditing ? 'Update Item' : 'Save New Item')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {items.length > 0 ? (
          items.map(item => (
            <ListItemComponent key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
          ))
        ) : (
          <p className="text-neutral-500 text-center py-4">No items yet. Click "Add New" to get started.</p>
        )}
      </div>
    </div>
  );
};

export default AdminCrudController;