import React  from 'react';
import './App.css';


import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from './pages/Home';
import MyState from './context/MyState';
import Carinfo from './components/cardata/Carinfo';
import CarDlivery from './pages/CarDlivery';
import Wishlist from './pages/Wishlist';

function App() {


  return (
   

    <div className="App">
      <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/carinfo/:name" element={<Carinfo/>}/>
          <Route path="/Wishlist" element={<Wishlist/>}/>
          <Route path="/cardelivery" element={<CarDlivery/>}/>
         
        </Routes>
      </Router>
      </MyState>
   
   
    </div>
  );
}

export default App;
