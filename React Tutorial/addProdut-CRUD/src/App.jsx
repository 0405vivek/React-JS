import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Components/Home'
import Header from './Components/Header'
import { Route, Routes } from 'react-router'
import AddProductForm from './Components/AddProduct'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/add-product' element={<AddProductForm/>}/>

    </Routes>
    </>
  )
}

export default App
