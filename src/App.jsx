import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Recetas from './pages/Recetas';
import Login from './pages/Login';
import Receta from './pages/Receta';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
       <Routes>
          <Route path="/" element= {<Home />}/>
          <Route path='/recetas' element={<Recetas/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/receta' element={<Navigate to="/recetas" replace />} />
          <Route path='/receta/:recetaid' element={<Receta/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
