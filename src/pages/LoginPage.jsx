// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AtSymbolIcon, LockClosedIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const GoogleIcon = (props) => (
  <svg viewBox="0 0 48 48" {...props}>
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.986,36.953,44,31.258,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, error
  const [error, setError] = useState('');

  // Reusable Tailwind styles for inputs
  const inputFieldStyles = "w-full rounded-md border border-zinc-700 bg-zinc-900 py-3 pl-10 pr-3 text-white transition-all duration-300 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setStatus('submitting');
    
    // --- Simulate an API call ---
    setTimeout(() => {
      // Hardcoded credentials for simulation
      if (email === 'user@example.com' && password === 'password') {
        console.log('Login successful!');
        setStatus('idle');
        // In a real app, you would redirect here:
        // history.push('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
        setStatus('error');
      }
    }, 2000);
  };

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center p-4 bg-cover bg-center" style={{backgroundImage: "url('https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"}}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-lg"></div>

      <motion.div
        className="relative w-full max-w-md bg-zinc-900/80 p-8 rounded-2xl border border-zinc-700 shadow-2xl backdrop-blur-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">Welcome Back</h1>
          <p className="text-zinc-400">Sign in to continue to your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence>
            {error && (
              <motion.div
                className="flex items-center p-3 mb-4 text-sm text-red-400 rounded-lg bg-red-500/10 border border-red-500/20"
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              >
                <ExclamationCircleIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="relative">
            <AtSymbolIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <input type="email" placeholder="user@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputFieldStyles} />
          </div>

          <div className="relative">
            <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputFieldStyles} />
          </div>
          
          <div className="text-right">
            <a href="#" className="text-sm text-sky-400 hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full flex justify-center font-semibold py-3 px-4 rounded-lg bg-sky-500 transition-all duration-300 hover:bg-sky-400 disabled:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === 'submitting' && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>}
            Sign In
          </button>

          {/*<div className="flex items-center justify-center my-6">
            <div className="flex-grow border-t border-zinc-700"></div>
            <span className="flex-shrink mx-4 text-zinc-400 text-sm">OR</span>
            <div className="flex-grow border-t border-zinc-700"></div>
          </div>
          
          <button
            type="button"
            className="w-full flex items-center justify-center font-semibold py-3 px-4 rounded-lg bg-zinc-800 border border-zinc-700 transition-all duration-300 hover:bg-zinc-700"
          >
            <GoogleIcon className="h-6 w-6 mr-3" />
            Sign in with Google
          </button>*/}
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;