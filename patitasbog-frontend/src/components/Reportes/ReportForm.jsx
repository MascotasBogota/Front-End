"use client"

import { useState } from "react"
import MapaSelector from "./MapaSelector"
import styles from "../../styles/ReportForm.module.css"
import { useNavigate } from "react-router-dom"


const ReportForm = ({ type = "lost", initialData = {}, onSubmit, onDiscard }) => {
  const [petName, setPetName] = useState(initialData.petName || "")
  const [petType, setPetType] = useState(initialData.petType || "")
  const [details, setDetails] = useState(initialData.details || "")
  const [location, setLocation] = useState(initialData.location || null)
  const [photos, setPhotos] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  const isLost = type === "lost"
  const isFound = type === "found"
  const isEdit = type === "updating"
  const isSighting = type === "sighting"

  const formTitle = isEdit ? "Editar Reporte" : isLost ? "Crear Reporte" : "Responder Reporte"
  const typeLabel = isEdit ? "Perdida" : isLost ? "Perdida" : type === "sighting" ? "Avistamiento" : "Encontrado"

  const requiredFields = ["petName", "petType", "details", "location"]
  if (isLost || isFound) requiredFields.push("photos")

  const navigate = useNavigate()

  const handleDiscard = () => {
    navigate(-1) // Volver a la página anterior
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage({ type: "", text: "" })

    const formData = { petName, petType, details, location, photos, type }

    const missingFields = requiredFields.filter((field) => {
      if (field === "location") return !location
      if (field === "photos") return photos.length === 0
      return !formData[field]
    })

    if (missingFields.length > 0) {
      setMessage({ type: "error", text: "Por favor, completa todos los campos obligatorios." })
      setIsSubmitting(false)
      return
    }

    const payload = {
      pet_name: petName,
      type: petType.toLowerCase(),
      description: details,
      location: {
        type: "Point",
        coordinates: [location.lng, location.lat],
      },
      images: photos.map((file) => URL.createObjectURL(file)), // reemplazar por URLs reales en producción
    }

    try {
      await onSubmit?.(payload)
      setMessage({ type: "success", text: "Reporte enviado con éxito!" })
    } catch (error) {
      console.error("Error al enviar reporte:", error)
      setMessage({ type: "error", text: "Error al enviar el reporte. Inténtalo de nuevo." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotos(Array.from(e.target.files))
    }
  }

  const handleRemovePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className={styles.reportFormContainer}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>{formTitle}</h2>
        <hr className={styles.divider} />
        <p className={styles.requiredFieldsNotice}>
          Los campos de nombre, tipo de mascota, detalles y ubicación son obligatorios.
          {(isLost || isFound) && " También se requiere al menos una foto."}
        </p>

        <form onSubmit={handleSubmit} className={styles.formGrid}>
          {/* Tipo de reporte */}
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
              readOnly={!isLost && !isEdit}
            />
          </div>

          {/* Tipo de mascota */}
          <div className={styles.formFieldFull}>
            <label className={styles.formLabel}>Tipo de mascota</label>
            <select
              name="petType"
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              className={styles.formInput}
              disabled={!isLost && !isEdit}
            >
              <option value="">Selecciona una opción</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Otro">Otro</option>
            </select>
            {message.type === "error" && !petType && (
              <p className={styles.errorText}>Por favor selecciona el tipo de mascota.</p>
            )}
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

          {/* Mapa ubicación */}
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

          {/* Fotos */}
          <div className={styles.formField}>
            <label className={styles.formLabel}>Fotos</label>
            <div className={styles.photoUploadContainer}>
              <div className={styles.photoPreviewGrid}>
                {photos.length > 0 ? (
                  photos.map((file, idx) => (
                    <div key={idx} className={styles.photoFileItem}>
                      📎 {file.name}
                      <button type="button" onClick={() => handleRemovePhoto(idx)} className={styles.removePhotoButton}>
                        ×
                      </button>
                    </div>
                  ))
                ) : initialData.photoURLs?.length ? (
                  initialData.photoURLs.map((url, idx) => (
                    <img key={idx} src={url} alt={`Foto existente ${idx + 1}`} className={styles.photoPreview} />
                  ))
                ) : (
                  <div className={styles.photoPlaceholder}>
                    <p></p>
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
                className={styles.fileInput}
                id="photo-upload"
                required={isLost || isFound}
              />
              <label htmlFor="photo-upload" className={styles.uploadButton}>
                Subir fotos
              </label>
            </div>
          </div>

          {/* Mensaje */}
          {message.text && (
            <div className={`${styles.messageBox} ${message.type === "error" ? styles.error : styles.success}`}>
              {message.text}
            </div>
          )}

          {/* Acciones */}
          <div className={styles.formActions}>
            <button type="button" onClick={() => navigate(-1)} className={styles.discardButton} disabled={isSubmitting}>
              Descartar
            </button>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : isEdit ? "Actualizar" : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReportForm
