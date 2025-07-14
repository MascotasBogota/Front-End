"use client"

import { useState } from "react"
import MapaSelector from "./MapaSelector" // Importa el componente de mapa selector
import styles from "../../styles/ReportForm.module.css" // Estilos específicos para el formulario

// Props:
// - type: "lost" | "sighting" | "found" (determina el tipo de reporte)
// - initialData: Objeto con datos pre-cargados si es una respuesta (ej. { petName: "Copito", location: { lat, lng } })
// - onSubmit: Función a llamar al enviar el formulario
// - onDiscard: Función a llamar al descartar
const ReportForm = ({ type = "lost", initialData = {}, onSubmit, onDiscard }) => {
  const [petName, setPetName] = useState(initialData.petName || "")
  const [details, setDetails] = useState(initialData.details || "")
  const [location, setLocation] = useState(initialData.location || null) // { lat, lng }
  const [photo, setPhoto] = useState(null) // Para manejar la carga de archivos
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  // Determinar el título del formulario y el texto del campo de tipo
  const formTitle = type === "lost" ? "Crear Reporte" : "Responder Reporte"
  const typeLabel = type === "lost" ? "Perdida" : type === "sighting" ? "Avistamiento" : "Encontrado"

  // Campos obligatorios (ejemplo, ajusta según tu backend)
  const requiredFields = ["petName", "details", "location", "photo"]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage({ type: "", text: "" })

    // Validaciones básicas
    const formData = { petName, details, location, photo, type }
    const missingFields = requiredFields.filter((field) => {
      if (field === "location") return !location
      if (field === "photo") return !photo
      return !formData[field]
    })

    if (missingFields.length > 0) {
      setMessage({ type: "error", text: "Por favor, completa todos los campos obligatorios." })
      setIsSubmitting(false)
      return
    }

    try {
      // Aquí llamarías a tu servicio de API para enviar el reporte
      // Por ahora, solo simulamos una llamada
      console.log("Enviando reporte:", formData)
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simular API call
      setMessage({ type: "success", text: "Reporte enviado con éxito!" })
      if (onSubmit) onSubmit(formData)
      // Opcional: resetear formulario o redirigir
      // setPetName(""); setDetails(""); setLocation(null); setPhoto(null);
    } catch (error) {
      console.error("Error al enviar reporte:", error)
      setMessage({ type: "error", text: "Error al enviar el reporte. Inténtalo de nuevo." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  return (
    <div className={styles.reportFormContainer}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>{formTitle}</h2>
        <hr className={styles.divider} />
        <p className={styles.requiredFieldsNotice}>Los campos de nombre, detalles, ubicación y foto son obligatorios</p>

        <form onSubmit={handleSubmit} className={styles.formGrid}>
          {/* Tipo de reporte (read-only) */}
          <div className={styles.formFieldFull}>
            <label className={styles.formLabel}>Tipo de reporte</label>
            <input type="text" value={typeLabel} className={styles.formInput} readOnly />
          </div>

          {/* Nombre mascota */}
          <div className={styles.formFieldFull}>
            <label className={styles.formLabel}>Nombre mascota</label>
            <input
              type="text"
              placeholder="Escribe el nombre de tu mascota"
              className={styles.formInput}
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              // El nombre es editable solo si es un reporte "lost" o si no hay initialData
              readOnly={type !== "lost" && initialData.petName}
              required
            />
          </div>

          {/* Detalles */}
          <div className={styles.formFieldFull}>
            <label className={styles.formLabel}>Detalles</label>
            <textarea
              placeholder="Escribe los detalles importantes"
              className={`${styles.formInput} ${styles.textarea}`}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </div>

          {/* Ubicación */}
          <div className={styles.formField}>
            <label className={styles.formLabel}>Ubicación</label>
            <div className={styles.mapContainer}>
              <MapaSelector setUbicacion={setLocation} ubicacionInicial={location} />
            </div>
            {location && (
              <p className={styles.locationText}>
                Ubicación seleccionada: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
            )}
          </div>

          {/* Foto */}
          <div className={styles.formField}>
            <label className={styles.formLabel}>Foto</label>
            <div className={styles.photoUploadContainer}>
              {photo ? (
                <img
                  src={URL.createObjectURL(photo) || "/placeholder.png"}
                  alt="Vista previa"
                  className={styles.photoPreview}
                />
              ) : (
                <div className={styles.photoPlaceholder}>
                  <img src="/placeholder.png?height=100&width=100" alt="Placeholder" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className={styles.fileInput}
                id="photo-upload"
                required
              />
              <label htmlFor="photo-upload" className={styles.uploadButton}>
                Subir foto
              </label>
            </div>
          </div>

          {message.text && (
            <div className={`${styles.messageBox} ${message.type === "error" ? styles.error : styles.success}`}>
              {message.text}
            </div>
          )}

          <div className={styles.formActions}>
            <button type="button" onClick={onDiscard} className={styles.discardButton} disabled={isSubmitting}>
              Descartar
            </button>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Cambiar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReportForm
