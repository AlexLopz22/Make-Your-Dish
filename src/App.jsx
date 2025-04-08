import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Recetas from './pages/Recetas';
import Login from './pages/Login';

function App() {
  return (
    <>
    <BrowserRouter>
       <Routes>
          <Route path="/" element= {<Home />}/>
          <Route path='/recetas' element={<Recetas/>}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
