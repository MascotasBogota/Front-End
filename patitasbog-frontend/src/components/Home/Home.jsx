"use client"

import { useEffect, useRef, useState } from "react"
import "../../styles/Home.css"
import { reportService } from "../../services/reportService"

const Home = () => {
  const [reportes, setReportes] = useState([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef(null)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await reportService.getAllReports()
        const reportesArray = Array.isArray(response) ? response : []
        setReportes(reportesArray)
      } catch (error) {
        console.error("Error al obtener reportes:", error)
        setReportes([])
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrameId
    const velocity = 1.2 // ✅ aquí cambias la velocidad

    const step = () => {
      if (!container) return

      container.scrollLeft += velocity

      // Si llegamos al final de la primera mitad, reiniciamos al inicio
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0
      }

      animationFrameId = requestAnimationFrame(step)
    }

    animationFrameId = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrameId)
  }, [reportes])


  const getPetName = (reporte) => {
    const petType = reporte.pet_type || reporte.type || reporte.animal_type || "Mascota"
    const petName = reporte.pet_name || reporte.name || reporte.petName || null
    if (petName && petName !== "string" && petName.trim() !== "") {
      return petName.charAt(0).toUpperCase() + petName.slice(1)
    }
    return petType.charAt(0).toUpperCase() + petType.slice(1)
  }

  const getStatus = (reporte) => {
    if (reporte.status === "open") return "Perdido"
    if (reporte.status === "found") return "Encontrado"
    if (reporte.status === "closed") return "Encontrado"
    return "Perdido"
  }

  const getValidImage = (reporte) => {
    const images = reporte.images || []
    if (images.length === 0) return getDefaultImage(reporte.type)
    const firstImage = images[0]
    if (!firstImage || firstImage === "string" || firstImage.trim() === "") {
      return getDefaultImage(reporte.type)
    }
    if (firstImage.startsWith("http://") || firstImage.startsWith("https://")) return firstImage
    if (firstImage.startsWith("/")) return `${window.location.origin}${firstImage}`
    return `${window.location.origin}/uploads/${firstImage}`
  }

  const getDefaultImage = (type) => {
    switch (type?.toLowerCase()) {
      case "perro":
        return "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=face"
      case "gato":
        return "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop&crop=face"
      default:
        return "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop&crop=center"
    }
  }

  const handleImageError = (e, type) => {
    e.target.src = getDefaultImage(type)
  }

  const duplicatedReportes = [...reportes, ...reportes]

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <div className="reports-tape-section">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Cargando reportes...</p>
            </div>
          ) : reportes.length === 0 ? (
            <div className="no-results-container">
              <h3>No hay reportes disponibles</h3>
              <p>Vuelve pronto para ver nuevos reportes de mascotas</p>
            </div>
          ) : (
            <div className="tape-container" ref={containerRef}>
              <div className="infinite-tape">
                {duplicatedReportes.map((reporte, index) => {
                  const status = getStatus(reporte)
                  const petName = getPetName(reporte)
                  const imageUrl = getValidImage(reporte)

                  return (
                    <div className="pet-card" key={`${reporte._id || index}-${index}`}>
                      <div className="pet-image-container">
                        <img
                          src={imageUrl}
                          alt={petName}
                          className="pet-image"
                          onError={(e) => handleImageError(e, reporte.type)}
                        />
                        <div className={`status-badge ${status === "Perdido" ? "status-perdido" : "status-encontrado"}`}>
                          {status}
                        </div>
                      </div>
                      <div className="pet-card-content">
                        <h3 className="pet-name">{petName}</h3>
                        <div className={`pet-status-text ${status.toLowerCase()}`}>
                          {status === "Perdido" ? "Se busca" : "Encontrado"}
                        </div>
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
      </div>

      <div className="bottom-notice">
        <p>Para ver más detalles e interactuar con los reportes debes iniciar sesión</p>
      </div>
    </div>
  )
}

export default Home
