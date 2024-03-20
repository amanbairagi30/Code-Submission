import { useState } from 'react'
import './App.css'
import Form from './Form/Form'
import { Toaster } from 'sonner'

function App() {

  return (
    <>
      <Toaster position="top-center" richColors/>
      <div className=' poppins-regular h-[80vh] mb-10 '>
        <Form />
      </div>
    </>
  )
}

export default App
