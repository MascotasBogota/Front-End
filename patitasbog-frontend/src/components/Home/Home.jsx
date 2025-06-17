import React, { useState } from 'react';
import '../../styles/Home.css';
import MapaLectura from '../Reportes/MapaLectura';

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

const Home = () => {
  // Estado para el campo de búsqueda
  const [busqueda, setBusqueda] = useState('');

  // Filtrado de reportes según el texto de búsqueda
  const reportesFiltrados = mockReportes.filter(r =>
    r.nombreMascota.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="home-container">
        {reportesFiltrados.map(reporte => (
            <div className='preview-container-home'>
              <div className='preview-columna-home'>
                <div className='foto-container-home'>
                  <img src={reporte.imagen} alt={reporte.nombreMascota} 
                  className="preview-foto-home" />
                </div>
              </div>
              <div className='preview-columna-home-alterna'>
                <div className='texto-preview-home'>
                    <h2>{reporte.nombreMascota}</h2>
                    <p>{reporte.detalles}</p>
                </div>
                <div className='mapa-preview-home'>
                    <MapaLectura ubicacion={[4.612, -74.07]} dragging={false} />
                </div>
              </div>
            </div>
      ))}
    </div>
  );
};

export default Home;