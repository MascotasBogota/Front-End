"use client"

import { useState, useEffect, useRef } from "react"
import "../../styles/Home.css"
import { reportService } from "../../services/reportService"

const Home = () => {
  const [reportes, setReportes] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)

  // Número de tarjetas visibles según el tamaño de pantalla
  const [cardsPerView, setCardsPerView] = useState(4)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await reportService.getAllReports()
        console.log("Reportes recibidos:", response)
        setReportes(Array.isArray(response) ? response : [])
      } catch (error) {
        console.error("Error al obtener reportes:", error)
        setReportes([])
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  // Actualizar número de tarjetas visibles según el tamaño de pantalla
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth
      const cardWidth = 300 + 32 // ancho de tarjeta + gap
      const availableWidth = width - 200 // restamos padding y márgenes

      // Calcular cuántas tarjetas caben completamente
      const maxCards = Math.floor(availableWidth / cardWidth)

      // Establecer límites según breakpoints
      if (width < 480) {
        setCardsPerView(Math.min(1, maxCards))
      } else if (width < 768) {
        setCardsPerView(Math.min(2, maxCards))
      } else if (width < 1200) {
        setCardsPerView(Math.min(3, maxCards))
      } else {
        setCardsPerView(Math.min(4, maxCards))
      }
    }

    updateCardsPerView()
    window.addEventListener("resize", updateCardsPerView)
    return () => window.removeEventListener("resize", updateCardsPerView)
  }, [])

  // Función para determinar el estado de la mascota
  const getStatus = (reporte) => {
    if (reporte.status === "open") return "Perdido"
    if (reporte.status === "found") return "Encontrado"
    if (reporte.status === "closed") return "Encontrado"
    return "Perdido"
  }

  // Función para obtener el nombre de la mascota
  const getPetName = (reporte) => {
    const type = reporte.type || "Mascota"
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  // Función para obtener imagen válida o imagen por defecto
  const getValidImage = (reporte) => {
    const images = reporte.images || []

    if (images.length === 0) {
      return getDefaultImage(reporte.type)
    }

    const firstImage = images[0]

    if (
      firstImage === "string" ||
      firstImage === "como se pasan imagenes? xd" ||
      !firstImage ||
      firstImage.trim() === ""
    ) {
      return getDefaultImage(reporte.type)
    }

    if (firstImage.startsWith("http://") || firstImage.startsWith("https://")) {
      return firstImage
    }

    if (firstImage.startsWith("/")) {
      return `${window.location.origin}${firstImage}`
    }

    return `${window.location.origin}/uploads/${firstImage}`
  }

  // Función para obtener imagen por defecto según el tipo de mascota
  const getDefaultImage = (type) => {
    switch (type?.toLowerCase()) {
      case "perro":
        return "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop&crop=face"
      case "gato":
        return "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop&crop=face"
      case "otro":
        return "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=300&h=300&fit=crop&crop=center"
      default:
        return "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop&crop=center"
    }
  }

  // Función para manejar errores de carga de imagen
  const handleImageError = (e, type) => {
    e.target.src = getDefaultImage(type)
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
      const cardWidth = 300 + 32
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
      <div className="reports-scroll-container">
        {loading ? (
          <div className="loading-container">Cargando reportes...</div>
        ) : reportes.length === 0 ? (
          <div className="loading-container">No hay reportes disponibles</div>
        ) : (
          <div className="carousel-container">
            {/* Navigation Controls - Outside cards area */}
            <div className="carousel-controls">
              <button
                className="carousel-nav"
                onClick={scrollLeft}
                disabled={currentIndex === 0}
                aria-label="Ver reportes anteriores"
              >
                ‹
              </button>

              <div className="carousel-info">
                {Math.min(currentIndex + cardsPerView, reportes.length)} de {reportes.length} reportes
              </div>

              <button
                className="carousel-nav"
                onClick={scrollRight}
                disabled={currentIndex >= Math.max(0, reportes.length - cardsPerView)}
                aria-label="Ver más reportes"
              >
                ›
              </button>
            </div>

            {/* Cards Carousel */}
            <div className="cards-carousel" ref={carouselRef}>
              {reportes.map((reporte, index) => {
                const status = getStatus(reporte)
                const petName = getPetName(reporte)
                const imageUrl = getValidImage(reporte)

                return (
                  <div className="pet-card" key={reporte._id || index}>
                    {/* Pet Image */}
                    <div className="pet-image-container">
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={petName}
                        className="pet-image"
                        onError={(e) => handleImageError(e, reporte.type)}
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

                      {/* Status Text - Subtle label */}
                      <div className={`pet-status-text ${status.toLowerCase()}`}>
                        {status === "Perdido" ? "Se busca" : "Encontrado"}
                      </div>

                      {/* Description */}
                      <p className="pet-description">
                        {reporte.description && reporte.description !== "string"
                          ? reporte.description
                          : `${petName} reportado como perdido. Se busca información sobre su paradero.`}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            
          </div>
        )}
      </div>

      {/* Bottom Notice - Always visible */}
      <div className="bottom-notice">
        <p>Para ver más detalles e interactuar con los reportes debes iniciar sesión</p>
      </div>
    </div>
  )
}

export default Home
