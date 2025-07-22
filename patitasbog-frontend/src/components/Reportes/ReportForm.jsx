"use client";

import { useState, useEffect } from "react";
import MapaSelector from "./MapaSelector";
import styles from "../../styles/ReportForm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { reportService } from "../../services/reportService";
import { responseService } from "../../services/responseService";
import { imageService } from "../../services/imageService";

const ReportForm = ({ type = "lost" }) => {
  const { reportId, responseId } = useParams();

  const isReportCreate = type === "lost";
  const isReportEdit = type === "updating";
  const isResponseCreate = type === "sighting" || type === "found";
  const isResponseEdit = type === "sightingEdit" || type === "foundEdit";

  const [isLoading, setIsLoading] = useState((isReportEdit || isResponseEdit) && !!reportId);
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState(null);
  const [newPhotos, setNewPhotos] = useState([]);
  const [existingPhotoURLs, setExistingPhotoURLs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [missingFieldsState, setMissingFieldsState] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      if (!reportId) return;
      setIsLoading(true);

      try {
        if (isReportEdit) {
          const data = await reportService.getReportById(reportId);
          if (!data) throw new Error("Reporte no encontrado");

          setPetName(data.pet_name || "");
          setPetType(data.type ? data.type.charAt(0).toUpperCase() + data.type.slice(1) : "");
          setDetails(data.description || "");
          setLocation(data.location?.coordinates ? { lat: data.location.coordinates[1], lng: data.location.coordinates[0] } : null);
          setExistingPhotoURLs(data.images || []);
        }

        if (isResponseEdit) {
          const resp = await responseService.getResponseById(reportId, responseId);
          if (!resp) throw new Error("Respuesta no encontrada");

          setDetails(resp.comment || "");
          setLocation(resp.location?.coordinates ? { lat: resp.location.coordinates[1], lng: resp.location.coordinates[0] } : null);
          setExistingPhotoURLs(resp.images || []);

          // Traer también info del reporte
          const report = await reportService.getReportById(reportId);
          setPetName(report?.pet_name || "");
          setPetType(report?.type ? report.type.charAt(0).toUpperCase() + report.type.slice(1) : "");
        }
      } catch (err) {
        console.error(err);
        setMessage({ type: "error", text: "No se pudo cargar la información" });
      } finally {
        setIsLoading(false);
      }
    };

    if (isReportEdit || isResponseEdit) loadData();
  }, [reportId, responseId, isReportEdit, isResponseEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });
    setMissingFieldsState([]);

    const required = ["details", "location", "photos"];
    if (isReportCreate || isReportEdit) required.push("petName", "petType");

    const allPhotos = [...existingPhotoURLs, ...newPhotos];
    const missing = required.filter((f) => {
      if (f === "location") return !location;
      if (f === "photos") return allPhotos.length === 0;
      if (f === "petName") return !petName;
      if (f === "petType") return !petType;
      if (f === "details") return !details;
      return false;
    });

    if (missing.length) {
      setMissingFieldsState(missing);
      setMessage({ type: "error", text: "Por favor, completa todos los campos obligatorios." });
      setIsSubmitting(false);
      return;
    }

    const uploadedUrls = [];
    try {
      for (const f of newPhotos) {
        const fd = new FormData();
        fd.append("image", f);
        const res = await imageService.uploadImage(fd);
        if (res?.imageUrl) uploadedUrls.push(res.imageUrl);
      }

      const allPhotoURLs = [...existingPhotoURLs, ...uploadedUrls];

      if (isReportCreate || isReportEdit) {
        const payload = {
          pet_name: petName,
          type: petType.toLowerCase(),
          description: details,
          location: { type: "Point", coordinates: [location.lng, location.lat] },
          images: allPhotoURLs,
        };
        if (isReportEdit) {
          await reportService.updateReport(reportId, payload);
          setMessage({ type: "success", text: "Reporte actualizado con éxito." });
        } else {
          await reportService.createReport(payload);
          setMessage({ type: "success", text: "Reporte creado con éxito." });
        }
      }

      if (isResponseCreate || isResponseEdit) {
        const payload = {
          type: type.includes("sighting") ? "avistamiento" : "hallazgo",
          comment: details,
          location: { type: "Point", coordinates: [location.lng, location.lat] },
          images: allPhotoURLs,
        };
        if (isResponseEdit) {
          await responseService.updateResponse(reportId, responseId, payload);
          setMessage({ type: "success", text: "Respuesta actualizada con éxito." });
        } else {
          await responseService.createResponse(reportId, payload);
          setMessage({ type: "success", text: "Respuesta enviada con éxito." });
        }
      }

      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      console.error("Error al enviar:", err);
      setMessage({ type: "error", text: "Error al enviar la información." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoChange = (e) => {
    if (e.target.files?.length) setNewPhotos(Array.from(e.target.files));
  };
  const handleRemoveNewPhoto = (i) => setNewPhotos((prev) => prev.filter((_, idx) => idx !== i));
  const handleRemoveExistingPhoto = (i) => setExistingPhotoURLs((prev) => prev.filter((_, idx) => idx !== i));

  if (isLoading) return <div className={styles.reportFormContainer}><p className={styles.loadingText}>Cargando datos...</p></div>;

  const allPhotos = [
    ...existingPhotoURLs.map((url) => ({ type: "url", value: url })),
    ...newPhotos.map((file) => ({ type: "file", value: file })),
  ];

  return (
    <div className={styles.reportFormContainer}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>
          {isReportEdit ? "Editar Reporte" : isReportCreate ? "Nuevo Reporte" : isResponseEdit ? "Editar Respuesta" : "Nueva Respuesta"}
        </h2>
        <hr className={styles.divider} />

        <form onSubmit={handleSubmit} className={styles.formGrid}>
          {/* Nombre y tipo */}
          <div className={styles.formFieldFull}>
            <label className={styles.formLabel}>Nombre mascota</label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className={`${styles.formInput} ${missingFieldsState.includes("petName") ? styles.inputError : ""}`}
              readOnly={!isReportCreate && !isReportEdit}
            />
          </div>

          <div className={styles.formFieldFull}>
            <label className={styles.formLabel}>Tipo de mascota</label>
            <input
              type="text"
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              className={`${styles.formInput} ${missingFieldsState.includes("petType") ? styles.inputError : ""}`}
              readOnly={!isReportCreate && !isReportEdit}
            />
          </div>

          <div className={styles.formFieldFull}>
            <label className={styles.formLabel}>Detalles</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className={`${styles.formInput} ${styles.textarea} ${missingFieldsState.includes("details") ? styles.inputError : ""}`}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Ubicación</label>
            <div className={`${styles.mapContainer} ${missingFieldsState.includes("location") ? styles.inputError : ""}`}>
              <MapaSelector setUbicacion={setLocation} ubicacionInicial={location} />
            </div>
            {location && (
              <p className={styles.locationText}>
                Ubicación: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
            )}
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Fotos</label>
            <div className={`${styles.photoUploadContainer} ${missingFieldsState.includes("photos") ? styles.inputError : ""}`}>
              <div className={styles.photoPreviewGrid}>
                {allPhotos.length > 0 ? (
                  allPhotos.map((item, idx) => (
                    <div key={idx} className={styles.photoItem}>
                      <img
                        src={item.type === "url" ? item.value : URL.createObjectURL(item.value)}
                        alt={`Foto ${idx + 1}`}
                        className={styles.photoPreview}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          item.type === "url"
                            ? handleRemoveExistingPhoto(idx)
                            : handleRemoveNewPhoto(idx - existingPhotoURLs.length)
                        }
                        className={styles.removePhotoButton}
                      >
                        ×
                      </button>
                    </div>
                  ))
                ) : (
                  <div className={styles.photoPlaceholder}>
                    <p>No has subido ninguna foto.</p>
                  </div>
                )}
              </div>

              {/* input invisible */}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
                className={styles.fileInput}
                id="photo-upload"
              />
              {/* botón visible */}
              <label htmlFor="photo-upload" className={styles.uploadButton}>
                Subir fotos
              </label>
            </div>
            {missingFieldsState.includes("photos") && (
              <p className={styles.errorText}>Debes subir al menos una foto.</p>
            )}
          </div>


          {message.text && (
            <div className={`${styles.messageBox} ${message.type === "error" ? styles.error : styles.success}`}>
              {message.text}
            </div>
          )}

          <div className={styles.formActions}>
            <button type="button" onClick={() => navigate(-1)} className={styles.discardButton} disabled={isSubmitting}>
              Descartar
            </button>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
