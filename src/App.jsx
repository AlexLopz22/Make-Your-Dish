import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Recetas from './pages/Recetas';

function App() {
  return (
    <>
    <BrowserRouter>
       <Routes>
          <Route path="/" element= {<Home />}/>
          <Route path='/recetas' element={<Recetas/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
