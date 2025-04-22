import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import UserProfileCard from './components/UserProfileCard'

function App() {
  // const [count, setCount] = useState(0

  return (
      <div class="card">
        <div class ="row" >
        <UserProfileCard name="Vivek Prajapati" email="vivek@gmail.com" image ="vite.svg" phone={"+91-9499511560"} gender = "Male"  skill1 ="UI-UX" skill2 = "HTML" skill3= "React JS" skill4 = "CSS"/>
        <UserProfileCard name="Meet Prajapati" email="meetprajapati@gmail.com" image ="vite.svg" phone={"+91-9499511560"} gender = "Male"  skill1 ="UI-UX" skill2 = "HTML" skill3= "React JS" skill4 = "CSS"/>
        <UserProfileCard name="Khushal Vaghasiya" email="khushalvaghasiya@gmail.com" image ="vite.svg" phone={"+91-9499511560"} gender = "Male"  skill1 ="UI-UX" skill2 = "HTML" skill3= "React JS" skill4 = "CSS"/>
        <UserProfileCard name="vivek" email="vivek@gmail.com" image ="Vivek.jpg" phone={"+91-9499511560"} gender = "Male"  skill1 ="UI-UX" skill2 = "HTML" skill3= "React JS" skill4 = "CSS"/>
        <UserProfileCard name="vivek" email="vivek@gmail.com" image ="vite.svg" phone={"+91-9499511560"} gender = "Male"  skill1 ="UI-UX" skill2 = "HTML" skill3= "React JS" skill4 = "CSS"/>
        <UserProfileCard name="vivek" email="vivek@gmail.com" image ="vite.svg" phone={"+91-9499511560"} gender = "Male"  skill1 ="UI-UX" skill2 = "HTML" skill3= "React JS" skill4 = "CSS"/>
        <UserProfileCard name="vivek" email="vivek@gmail.com" image ="vite.svg" phone={"+91-9499511560"} gender = "Male"  skill1 ="UI-UX" skill2 = "HTML" skill3= "React JS" skill4 = "CSS"/>
        <UserProfileCard name="vivek" email="vivek@gmail.com" image ="vite.svg" phone={"+91-9499511560"} gender = "Male"  skill1 ="UI-UX" skill2 = "HTML" skill3= "React JS" skill4 = "CSS"/>
        <UserProfileCard name="vivek" email="vivek@gmail.com" image ="vite.svg" phone={"+91-9499511560"} gender = "Male"  skill1 ="UI-UX" skill2 = "HTML" skill3= "React JS" skill4 = "CSS"/>
        <UserProfileCard name="vivek" email="vivek@gmail.com" image ="vite.svg" phone={"+91-9499511560"} gender = "Male"  skill1 ="UI-UX" skill2 = "HTML" skill3= "React JS" skill4 = "CSS"/>
        <UserProfileCard name="vivek" email="vivek@gmail.com" image ="vite.svg" phone={"+91-9499511560"} gender = "Male"  skill1 ="UI-UX" skill2 = "HTML" skill3= "React JS" skill4 = "CSS"/>
        </div>
      </div>
     
  )
}

export default App
