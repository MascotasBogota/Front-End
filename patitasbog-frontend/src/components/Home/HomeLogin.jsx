/**
 * El componente HomeLogin muestra una lista de reportes de mascotas con funcionalidad de búsqueda.
 *
 * - Obtiene los reportes desde reportService al montar el componente.
 * - Permite filtrar los reportes por nombre de mascota usando un campo de búsqueda.
 * - Muestra un indicador de carga mientras se obtienen los datos.
 * - Muestra un mensaje si no se encuentran reportes después de filtrar.
 * - Renderiza una vista previa para cada reporte, incluyendo la imagen y detalles de la mascota.
 *
 * @component
 * @returns {JSX.Element} El componente HomeLogin renderizado.
 */
import React, { useState, useEffect } from 'react';
import '../../styles/Home.css';
import { reportService } from '../../services/reportService';


const HomeLogin = () => {
  const [busqueda, setBusqueda] = useState('');
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Filtrado por nombre de mascota
  const reportesFiltrados = reportes.filter(r =>
    r.nombreMascota?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="cabecera-home">
        <button className="button-principal">
          Mis Reportes
        </button>
        <input
          type="text"
          className="input"
          placeholder="Buscar"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>
      {loading && <div>Cargando reportes...</div>}
      {!loading && reportesFiltrados.length === 0 && (
        <div>No se encontraron reportes.</div>
      )}
      {!loading && reportesFiltrados.map(reporte => (
        <div key={reporte.id} className="preview-container-home">
          <div className="preview-columna-home">
            <div className="foto-container-home">
              <img src={reporte.imagen} alt={reporte.nombreMascota} className="preview-foto-home" />
            </div>
          </div>
          <div className="preview-columna-home-alterna">
            <div className="texto-preview-home">
              <h2>{reporte.nombreMascota}</h2>
              <p>{reporte.detalles}</p>
            </div>
            {/* Aquí podrías agregar el mapa si lo necesitas */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeLogin;