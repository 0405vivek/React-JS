import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import ContarolComp from './Components/contarolComp'
// import UnContarolComp from './Components/UnControlComp'
import Validation from './Components/Validition'
// import User from './Components/User'
import HOCComp from './Components/HOC'

const HOCFORM = HOCComp(Validation)

function App() {
  // const [count, setCount] = useState(0)
  let [isLoading, setIsLoding] = useState(true);

  
  useEffect(() => {
    setTimeout(() => {
      setIsLoding(false);
    }, 3000);
  });


  return (
    <>
      {/* <ContarolComp/>
      <UnContarolComp/> */}
      <Validation/>
      {/* <User/> */}
    </>
  )
}

export default App
