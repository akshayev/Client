import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

const AdminSection = ({ title, onSave, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="bg-neutral-900/50 p-6 md:p-8 rounded-xl border border-white/10"
    >
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">{title}</h3>
            <button onClick={onSave} className="bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 ml-auto">
                <FiPlus /> Save {title}
            </button>
        </div>
        <div className="space-y-6">{children}</div>
    </motion.div>
);

export default AdminSection;