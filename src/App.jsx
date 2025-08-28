import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Home from './pages/Home.jsx'
import AboutPage from './pages/About.jsx'
import Nav from './componets/Navbar.jsx'
import Footer from './componets/Footer.jsx'
import Gallery from './pages/GalleryPage.jsx'
import JoinPage from './pages/JoinPage.jsx'
import AdminPage from './pages/AdminPage.jsx'

<<<<<<< Updated upstream

function App() {
=======
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
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const AdminPage = lazy(() => import('./pages/AdminPage.jsx'));
const Aaravam = lazy(() => import('./pages/Aaravam.jsx'));

function App() {
  return (
    // FIX 1: Make this div a flex container that is at least the height of the screen
    <div className='flex flex-col min-h-screen w-full bg-neutral-950'>
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
              <Route path="/login" element={<LoginPage />} />
              <Route path="/aaravam" element={<Aaravam />} />
              <Route 
                path="/admin" 
                element={<ProtectedRoute><AdminPage /></ProtectedRoute>} 
              />
            </Routes>
          </Suspense>
        </main>
>>>>>>> Stashed changes

  return (
    <div className='w-full'>

      <Nav /> 

      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/admin" element={<AdminPage />} />

      </Routes>

      <Footer />

    </div>
  )
}

export default App
