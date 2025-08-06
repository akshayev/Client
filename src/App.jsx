import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import About from './pages/About.jsx'
import Home from './pages/Home.jsx'


function App() {

  return (
    <div className='w-full'>

      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

    </div>
  )
}

export default App
