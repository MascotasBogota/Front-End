import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Home.css';
import MapaLectura from '../Reportes/MapaLectura';
import { reportService } from '../../services/reportService';

const Home = () => {
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)

  // Número de tarjetas visibles según el tamaño de pantalla
  const [cardsPerView, setCardsPerView] = useState(4)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await reportService.getAllReports();
        console.log('Reportes recibidos:', response);
        setReportes(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error('Error al obtener reportes:', error);
        setReportes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Actualizar número de tarjetas visibles según el tamaño de pantalla
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth
      if (width < 480) {
        setCardsPerView(1)
      } else if (width < 768) {
        setCardsPerView(2)
      } else if (width < 1200) {
        setCardsPerView(3)
      } else {
        setCardsPerView(4)
      }
    }

    updateCardsPerView()
    window.addEventListener("resize", updateCardsPerView)
    return () => window.removeEventListener("resize", updateCardsPerView)
  }, [])

  // Función para determinar el estado de la mascota
  const getStatus = (reporte) => {
    if (reporte.status) return reporte.status
    if (reporte.estado) return reporte.estado
    if (reporte.found !== undefined) return reporte.found ? "Encontrado" : "Perdido"
    return "Perdido" // default
  }

  // Función para obtener el nombre de la mascota
  const getPetName = (reporte) => {
    return reporte.type || reporte.petName || reporte.name || reporte.nombreMascota || "Mascota"
  }

  // Función para navegar hacia la izquierda
  const scrollLeft = () => {
    if (currentIndex > 0) {
      const newIndex = Math.max(0, currentIndex - cardsPerView)
      setCurrentIndex(newIndex)
      scrollToIndex(newIndex)
    }
  }

  // Función para navegar hacia la derecha
  const scrollRight = () => {
    const maxIndex = Math.max(0, reportes.length - cardsPerView)
    if (currentIndex < maxIndex) {
      const newIndex = Math.min(maxIndex, currentIndex + cardsPerView)
      setCurrentIndex(newIndex)
      scrollToIndex(newIndex)
    }
  }

  // Función para hacer scroll suave a un índice específico
  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const cardWidth = 300 + 32 // ancho de tarjeta + gap
      const scrollPosition = index * cardWidth
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }
  }

  // Función para ir a un punto específico del carrusel
  const goToSlide = (index) => {
    setCurrentIndex(index)
    scrollToIndex(index)
  }

  // Calcular número total de "páginas" del carrusel
  const totalPages = Math.ceil(reportes.length / cardsPerView)

  return (
    <div className="home-container">
      {/* Scrollable reports container */}
      <div className="reports-scroll-container">
        {loading ? (
          <div className="loading-container">Cargando reportes...</div>
        ) : (
          <div className="carousel-container">
            {/* Navigation Arrows */}
            <button
              className="carousel-nav carousel-nav-left"
              onClick={scrollLeft}
              disabled={currentIndex === 0}
              aria-label="Ver reportes anteriores"
            >
              ‹
            </button>

            <button
              className="carousel-nav carousel-nav-right"
              onClick={scrollRight}
              disabled={currentIndex >= Math.max(0, reportes.length - cardsPerView)}
              aria-label="Ver más reportes"
            >
              ›
            </button>

            {/* Cards Carousel */}
            <div className="cards-carousel" ref={carouselRef}>
              {reportes.map((reporte, index) => {
                const status = getStatus(reporte)
                const petName = getPetName(reporte)

                return (
                  <div className="pet-card" key={reporte._id || index}>
                    {/* Pet Image */}
                    <div className="pet-image-container">
                      <img
                        src={reporte.images?.[0] || "https://via.placeholder.com/300x300"}
                        alt={petName}
                        className="pet-image"
                      />

                      {/* Status Badge */}
                      <div className={`status-badge ${status === "Perdido" ? "status-perdido" : "status-encontrado"}`}>
                        {status}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="pet-card-content">
                      {/* Pet Name */}
                      <h3 className="pet-name">{petName}</h3>

                      {/* Description */}
                      <p className="pet-description">
                        {reporte.description || "Sin detalles disponibles sobre esta mascota."}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Carousel Indicators */}
            {totalPages > 1 && (
              <div className="carousel-indicators">
                {Array.from({ length: totalPages }, (_, index) => (
                  <div
                    key={index}
                    className={`carousel-dot ${Math.floor(currentIndex / cardsPerView) === index ? "active" : ""}`}
                    onClick={() => goToSlide(index * cardsPerView)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Notice - Always visible */}
      <div className="bottom-notice">
        <p>Para ver más detalles e interactuar con los reportes debes iniciar sesión</p>
      </div>
    </div>
  );
};

export default Home;
