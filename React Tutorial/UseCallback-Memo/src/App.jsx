import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Count from './Components/Count'
import CompA from './Components/UseContext/CompA'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Count/> */}
      <CompA/>
    </>
  )
}

export default App
