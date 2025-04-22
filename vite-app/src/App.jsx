import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Events from './Components/Events'
import ListComp from './Components/List'
import RefHooks from './Components/RefHooks'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <Events/> */}
      <ListComp/>
      <RefHooks/>
    </div>
  )
}

export default App
