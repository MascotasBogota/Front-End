import { getPetName, getStatus, getValidImage, getDefaultImage } from "../../utils/reportUtils.js";
import styles from "../../styles/Home.module.css";

const PetCard = ({ reporte }) => {
  const status = getStatus(reporte);
  const petName = getPetName(reporte);
  const imageUrl = getValidImage(reporte);

  const handleImageError = (e) => {
    e.target.src = getDefaultImage(reporte.type);
  };

  return (
    <div className={styles.petCard}>
      <div className={styles.petImageContainer}>
        <img
          src={imageUrl}
          alt={petName}
          className={styles.petImage}
          onError={handleImageError}
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
  );
};

export default PetCard;
