import { useState } from 'react'
import './App.css' // Si tienes estilos específicos para App.jsx
import Navbar from './components/App/Navbar' // Asegúrate de que la ruta sea correcta
import './index.css' // Importa tu CSS global, que ahora ya no tiene Tailwind

function App() {
  return (
    <>
      <Navbar />
    </>
  )
}

export default App