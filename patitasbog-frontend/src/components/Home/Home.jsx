/**
 * Componente principal de la página de inicio.
 * 
 * Obtiene y muestra una lista de reportes de mascotas desde la API.
 * Muestra un mensaje de carga mientras se obtienen los datos y un mensaje
 * si no se encuentran reportes.
 * 
 * @component
 * @example
 * return (
 *   <Home />
 * )
 */
import React, { useState, useEffect } from 'react';
import '../../styles/Home.css';
import { reportService } from '../../services/reportService';

const Home = () => {
  // Estado para los reportes obtenidos de la API
  const [reportes, setReportes] = useState([]);
  // Estado para saber si está cargando
  const [loading, setLoading] = useState(true);

  // Obtener los reportes al montar el componente
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await reportService.getAllReports();
        setReportes(Array.isArray(data) ? data : []);
      } catch (error) {
        setReportes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="home-reportes-container">
      {loading && <div>Cargando reportes...</div>}
      <div className="home-lista-reportes">
        {!loading && reportes.length === 0 && (
          <div>No se encontraron reportes.</div>
        )}
        {!loading && reportes.map(reporte => (
          <div key={reporte.id} className="home-reporte-card">
            <img src={reporte.imagen} alt={reporte.nombreMascota} className="home-reporte-img" />
            <div className="home-reporte-info">
              <h2 className="home-reporte-nombre">{reporte.nombreMascota}</h2>
              <p className="home-reporte-detalles">{reporte.detalles}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;