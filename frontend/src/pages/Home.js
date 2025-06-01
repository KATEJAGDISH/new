import { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Hero from '../components/hero/Hero'
import Media from '../components/hero/Media'
import Login from '../login/Login'
import DisplayCar from '../components/cardata/DisplayCar'

function Home() {
    const [ showLogin,setShowLogin]=useState(false)
  return (
    
    <div>
          {showLogin && <Login setShowLogin={setShowLogin} />}
        <Navbar setShowLogin={setShowLogin}  showLogin={showLogin} />
        <Hero/>
        <Media/> 
        <DisplayCar/>

       
    </div>
  )
}

export default Home