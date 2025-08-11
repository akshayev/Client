import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Home from './pages/Home.jsx'
import AboutPage from './pages/About.jsx'
import Nav from './componets/Navbar.jsx'
import Footer from './componets/Footer.jsx'
import Gallery from './pages/GalleryPage.jsx'
import JoinPage from './pages/JoinPage.jsx'


function App() {

  return (
    <div className='w-full'>

      <Nav />

      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/join" element={<JoinPage />} />

      </Routes>

      <Footer />

    </div>
  )
}

export default App
