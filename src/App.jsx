import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Recetas from './pages/Recetas';
import Login from './pages/Login';
import Receta from './pages/Receta';
import { Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Usuario from './pages/Usuario'
import Foro from './pages/Foro'
import Plan from './pages/PlanSemanal'
import Registro from './pages/Registro';

function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
       <Routes>
          <Route path="/" element= {<Home />}/>
          <Route path='/recetas' element={<Recetas/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/receta' element={<Navigate to="/recetas" replace />} />
          <Route path='/receta/:recetaid' element={<Receta/>} />
          <Route path='/usuario' element={<Usuario/>} />
          <Route path='/foro' element={<Foro/>}/>
          <Route path='/plan' element={<Plan/>}/>
          <Route path='/registro' element={<Registro/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
