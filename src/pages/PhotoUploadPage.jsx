// src/pages/PhotoUploadPage.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotoIcon, XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const PhotoUploadPage = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formData, setFormData] = useState({ title: '', category: 'Nature', description: '' });
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  // Define shared Tailwind styles as constants for cleaner JSX
  const inputFieldStyles = "block w-full rounded-md border border-zinc-700 bg-zinc-900 py-2.5 px-3 text-white transition-all duration-300 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25";
  const errorMessageStyles = "flex items-center text-red-400 text-sm mb-4";
  
  // Clean up the object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        setErrorMessage('Only image files are allowed.');
        return;
      }
      setErrorMessage('');
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const removeImage = () => {
    URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl('');
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage('Please select a photo to upload.');
      return;
    }
    setUploadStatus('uploading');
    setErrorMessage('');


    setTimeout(() => {
      setUploadStatus('success');
      
      setTimeout(() => {
        removeImage();
        setFormData({ title: '', category: 'Nature', description: '' });
        setUploadStatus('idle');
      }, 3000);
    }, 2000);
  };

  const categories = ['Nature', 'Urban', 'Portrait', 'Abstract', 'Other'];

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center p-4 bg-cover bg-center pt-20" style={{backgroundImage: "url('https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"}}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-none"></div>

      <motion.div
        className="relative container max-w-4xl mx-auto bg-zinc-900/80 p-6 md:p-10 rounded-2xl border border-zinc-700 shadow-2xl backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
          Upload New Photograph
        </h1>
        <p className="text-zinc-400 text-center mb-8">Add a new masterpiece to the collection</p>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-8 min-h-[450px]">
            {/* --- LEFT COLUMN: Image Dropzone and Preview --- */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
              <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" disabled={!!file}/>
              <AnimatePresence>
                {!file ? (
                  <motion.label 
                    key="upload-prompt"
                    htmlFor="file-upload" 
                    className="flex flex-col justify-center items-center w-full aspect-square rounded-lg border-2 border-dashed border-zinc-600 cursor-pointer transition-all duration-300 hover:border-sky-500 hover:bg-zinc-800/50 hover:ring-4 hover:ring-sky-500/20"
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <PhotoIcon className="mx-auto h-12 w-12 text-zinc-500 transition-transform duration-300 group-hover:scale-110" />
                    <span className="mt-2 block font-semibold text-zinc-400">Click to upload</span>
                    <span className="mt-1 block text-xs text-zinc-500">PNG, JPG, or WEBP</span>
                  </motion.label>
                ) : (
                  <motion.div
                    key="image-preview"
                    className="relative w-full aspect-square"
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg shadow-lg"/>
                    <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-black/60 rounded-full p-1.5 text-white hover:bg-white/20 transition-all duration-300">
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* --- RIGHT COLUMN: Metadata Form --- */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <AnimatePresence>
                {file && uploadStatus !== 'success' && (
                  <motion.div
                    className="flex flex-col h-full"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
                      <input type="text" name="title" id="title" required value={formData.title} onChange={handleInputChange} className={inputFieldStyles} />
                    </div>
                    <div className="my-4">
                      <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
                      <select id="category" name="category" required value={formData.category} onChange={handleInputChange} className={inputFieldStyles}>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                      <textarea id="description" name="description" rows={4} required value={formData.description} onChange={handleInputChange} className={inputFieldStyles}/>
                    </div>
                    
                    <div className="mt-auto pt-4">
                      {errorMessage && <div className={errorMessageStyles}><ExclamationTriangleIcon className="h-5 w-5 mr-2" />{errorMessage}</div>}
                      
                      {uploadStatus === 'uploading' && (
                        <div className="w-full bg-zinc-700 rounded-full h-2.5 mb-4">
                          <motion.div className="bg-sky-500 h-2.5 rounded-full" initial={{width: 0}} animate={{width: "100%"}} transition={{duration: 2, ease: "linear"}}></motion.div>
                        </div>
                      )}
                      
                      <button 
                        type="submit" 
                        disabled={uploadStatus === 'uploading'} 
                        className="w-full font-semibold py-3 px-4 rounded-lg bg-sky-500 transition-all duration-300 hover:bg-sky-400 disabled:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {uploadStatus === 'uploading' ? 'Uploading...' : 'Confirm & Upload'}
                      </button>
                    </div>
                  </motion.div>
                )}
                {uploadStatus === 'success' && (
                   <motion.div
                    key="success-message"
                    className="flex flex-col items-center justify-center h-full text-center"
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                   >
                     <CheckCircleIcon className="w-24 h-24 text-green-400" />
                     <h2 className="text-2xl font-bold mt-4">Upload Complete!</h2>
                     <p className="text-zinc-400 mt-2">Your photo has been added to the collection.</p>
                   </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PhotoUploadPage;