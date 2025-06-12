import React, { useState } from 'react';
import './HomeLogin.css';

// Datos simulados de reportes (puedes reemplazar por datos reales)
const mockReportes = [
  {
    id: 1,
    nombreMascota: 'El Bigotes',
    detalles: 'Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles',
    imagen: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
    // Aquí puedes agregar la propiedad 'mapa' o 'ubicacion' si quieres mostrar un mapa real
  },
  {
    id: 2,
    nombreMascota: 'Pies Ligeros',
    detalles: 'Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles Detalles',
    imagen: 'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg',
    // Aquí puedes agregar la propiedad 'mapa' o 'ubicacion' si quieres mostrar un mapa real
  }
];

const HomeLogin = () => {
  // Estado para el campo de búsqueda
  const [busqueda, setBusqueda] = useState('');

  // Filtrado de reportes según el texto de búsqueda
  const reportesFiltrados = mockReportes.filter(r =>
    r.nombreMascota.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="mis-reportes-container">
      {/* Barra superior con botón y campo de búsqueda */}
      <div className="barra-superior-reportes">
        <button
          className="button-principal"
        >
          Mis Reportes
        </button>
        <input
          type="text"
          className="input-formulario input-busqueda"
          placeholder="Buscar"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      {/* Lista de reportes (tarjetas con imagen, texto y mapa) */}
      <div className="lista-reportes">
        {reportesFiltrados.map(reporte => (
          <div key={reporte.id} className="reporte-card">
            {/* Imagen de la mascota */}
            <img src={reporte.imagen} alt={reporte.nombreMascota} className="reporte-img" />
            <div className="reporte-info">
              {/* Nombre y detalles */}
              <h2 className="reporte-nombre">{reporte.nombreMascota}</h2>
              <p className="reporte-detalles">{reporte.detalles}</p>
              {/* Aquí puedes mostrar un mapa estático o el componente MapaSelecto */}
              <img src={reporte.mapa} alt="Mapa" className="reporte-mapa" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeLogin;