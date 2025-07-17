import React from 'react';
import styles from '../../styles/Education.module.css';

const CategoriesSection = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    {
      id: 'general',
      name: 'Consejos Generales',
      icon: '🏠',
      description: 'Fundamentos básicos para cuidar tu mascota'
    },
    {
      id: 'prevention',
      name: 'Prevención',
      icon: '🛡️',
      description: 'Evita que tu mascota se pierda'
    },
    {
      id: 'search',
      name: 'Búsqueda',
      icon: '🔍',
      description: 'Qué hacer si tu mascota se pierde'
    },
    {
      id: 'care',
      name: 'Cuidados',
      icon: '❤️',
      description: 'Salud y bienestar de tu mascota'
    }
  ];

  return (
    <section className={styles.categoriesSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Categorías de Aprendizaje</h2>
        <p className={styles.sectionDescription}>
          Selecciona una categoría para ver consejos específicos
        </p>
      </div>
      
      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${styles.categoryCard} ${
              selectedCategory === category.id ? styles.categoryActive : ''
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className={styles.categoryIcon}>{category.icon}</div>
            <h3 className={styles.categoryTitle}>{category.name}</h3>
            <p className={styles.categoryDescription}>{category.description}</p>
            <div className={styles.categoryArrow}>→</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
