import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import AboutPage from './pages/About.jsx'
import Home from './pages/Home.jsx'
import Navbar from './componets/Navbar.jsx'
import Footer from './componets/Footer.jsx'


function App() {

  return (
    <div className='w-full'>

      <Navbar />
      
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>

      <Footer />

    </div>
  )
}

export default App
