"use client"

import { useEffect, useRef, useState } from "react"
import styles from "../../styles/Home.module.css"
import { motion } from "framer-motion"
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
    <div className={styles.homeContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.landingHeroSection}>
          <div className={styles.heroContent}>
            <div className={styles.heroTextSection}>
              <h1 className={styles.heroTitle}>Encuentra a tu mascota perdida aquí</h1>

              <div className={styles.heroQuestions}>
                <div className={styles.questionItem}>
                  <p>¿Alguna vez has visto un animal que parece perdido y no sabes a quién reportarlo?</p>
                </div>
                <div className={styles.questionItem}>
                  <p>¿Alguna vez has perdido a tu mascota y no sabes dónde pedir ayuda?</p>
                </div>
                <div className={styles.questionItem}>
                  <p>¿Se hace difícil seguir todos los avistamientos de tu mascota perdida?</p>
                </div>
              </div>

              <div className={styles.heroSolution}>
                <p>Aquí está la solución</p>
              </div>
            </div>

            <div className={styles.heroImageSection}>
              <div className={styles.catIllustration}>
                <img src="/images/cat.svg" alt="Ilustración de gato" className={styles.catSvg} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.reportsTapeSection}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>Cargando reportes...</p>
            </div>
          ) : reportes.length === 0 ? (
            <div className={styles.noResultsContainer}>
              <h3>No hay reportes disponibles</h3>
              <p>Vuelve pronto para ver nuevos reportes de mascotas</p>
            </div>
          ) : (
            <div className={styles.tapeContainer}>
              <motion.div
                className={styles.tapeScroller}
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              >
                <div className={styles.infiniteTape}>
                  {[...reportes, ...reportes].map((reporte, index) => {
                    const status = getStatus(reporte)
                    const petName = getPetName(reporte)
                    const imageUrl = getValidImage(reporte)

                    return (
                      <div className={styles.petCard} key={`${reporte._id || index}-${index}`}>
                        <div className={styles.petImageContainer}>
                          <img
                            src={imageUrl}
                            alt={petName}
                            className={styles.petImage}
                            onError={(e) => handleImageError(e, reporte.type)}
                          />
                          <div
                            className={`${styles.statusBadge} ${
                              status === "Perdido" ? styles.statusPerdido : styles.statusEncontrado
                            }`}
                          >
                            {status}
                          </div>
                        </div>
                        <div className={styles.petCardContent}>
                          <h3 className={styles.petName}>{petName}</h3>
                          <div
                            className={`${styles.petStatusText} ${
                              status === "Perdido" ? styles.perdido : styles.encontrado
                            }`}
                          >
                            {status === "Perdido" ? "Se busca" : "Encontrado"}
                          </div>
                          <p className={styles.petDescription}>
                            {reporte.description && reporte.description !== "string"
                              ? reporte.description
                              : `${petName} reportado como perdido.`}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            </div>

          )}
        </div>
      </div>

      <div className={styles.bottomNotice}>
        <p>Para ver más detalles e interactuar con los reportes debes iniciar sesión</p>
      </div>
    </div>
  )
}

export default Home
