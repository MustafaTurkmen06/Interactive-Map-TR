import React from 'react'

// still importları
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/js/all.min.js"
import "./style.css"
import TurkeyMap from './TurkeyMap'
import MainPage from './MainPage'
import Navbar from './Navbar'
import Footer from './Footer'
import Login from './Login'
import Map from './Map'

const App = () => {
  return (
    <div>
      <Navbar/>
      <MainPage/>
      <TurkeyMap/>
      <Map/>
      <Footer/>
      {/* <Login/> */}
    </div>
  )
}

export default App
