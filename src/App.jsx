import { useState } from 'react'
import './App.css'
import Form from './pages/Form/Form'
import { Toaster } from 'sonner'
import { Route, Routes } from 'react-router-dom'
import Submission from './pages/Submissions/Submission'

import Navbar from './components/Navbar/Navbar'

function App() {

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className='borde max-h-fit poppins-regular min-h-[80vh] mb-10 '>
        <Navbar />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/submissions" element={<Submission />} />
        </Routes>

      </div>
    </>
  )
}

export default App
