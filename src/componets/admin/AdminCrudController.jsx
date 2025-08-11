import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiX } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';

const AdminCrudController = ({
  title,
  items,
  setItems,
  FormComponent,
  ListItemComponent,
  initialFormState
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentItem({ ...initialFormState, id: uuidv4() }); // Assign a temporary unique ID
    setIsFormVisible(true);
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
    setIsFormVisible(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    if (isEditing) {
      // Update existing item
      setItems(items.map(item => (item.id === currentItem.id ? currentItem : item)));
    } else {
      // Add new item
      setItems([currentItem, ...items]);
    }
    // In a real app, you would now sync with your backend API
    console.log('Saving item:', currentItem);
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setIsEditing(false);
    setCurrentItem(initialFormState);
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
            <FormComponent currentItem={currentItem} setCurrentItem={setCurrentItem} />
            <button
              onClick={handleSave}
              className="mt-6 bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {isEditing ? 'Update Item' : 'Save New Item'}
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