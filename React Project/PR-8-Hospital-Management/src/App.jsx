import { useState } from 'react'
import AddNewPatient from './Components/AddNewPatient'
import Navbar from './Components/Header'
import { Route, Routes } from 'react-router-dom'
import EditPatient from './Components/EditPatient'
import HomePage from './Components/HomePage'
import PatientCard from './Components/PatientCard'
import PatientDetail from './Components/PatientDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Routes>
       <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddNewPatient />} />
        <Route path="/edit/:id" element={<EditPatient />} />
        <Route path="/view/:id" element={<PatientDetail />} /> 
      </Routes>
    </>
  )
}

export default App
