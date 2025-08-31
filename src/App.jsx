// src/App.jsx

import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Suspense, lazy } from 'react';
import { Analytics } from "@vercel/analytics/react"

// Your components
import Nav from './componets/Navbar.jsx';
import Footer from './componets/Footer.jsx';
import LoadingPage from './pages/LoadingPage.jsx';

// Context and Protected Routes
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './componets/admin/ProtectedRoute.jsx';

// Your Lazily Loaded Pages
const Home = lazy(() => import('./pages/Home.jsx'));
const AboutPage = lazy(() => import('./pages/About.jsx'));
const GalleryPage = lazy(() => import('./pages/GalleryPage.jsx'));
const JoinPage = lazy(() => import('./pages/JoinPage.jsx'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage.jsx'));
const AdminPage = lazy(() => import('./pages/AdminPage.jsx'));
const Aaravam = lazy(() => import('./pages/Aaravam.jsx'));
const VideoListing = lazy(() => import('./pages/VideoListing.jsx'));

function App() {
  return (
    // FIX 1: Make this div a flex container that is at least the height of the screen
    <div className='flex flex-col min-h-screen w-full bg-neutral-950'>
      <Analytics/>
      <AuthProvider>
        <Nav /> 
        <ToastContainer />
        
        {/* FIX 2: This 'main' element will grow to fill all available space */}
        <main className="flex-1">
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/join" element={<JoinPage />} />
              <Route path="/login" element={<AdminLoginPage />} />
              <Route path="/aaravam" element={<Aaravam />} />
              <Route path="/videos" element={<VideoListing />} />
              <Route 
                path="/admin" 
                element={<ProtectedRoute><AdminPage /></ProtectedRoute>} 
              />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;