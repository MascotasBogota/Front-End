import React, { useState } from 'react';
import styles from '../../styles/Education.module.css';

const CategoriesSection = ({ selectedCategory, setSelectedCategory }) => {
  const [clickedCategory, setClickedCategory] = useState(null);
  
  const handleCategoryClick = (categoryId) => {
    // Efecto de click temporal
    setClickedCategory(categoryId);
    setTimeout(() => setClickedCategory(null), 300);
    
    setSelectedCategory(categoryId);
  };
  const categories = [
    {
      id: 'general',
      name: 'Consejos Generales',
      icon: '🏠',
      description: [
                    'Identificación de mascotas',
                    'Mantenimiento de fotos actualizadas',
                    'Conocimiento del vecindario',
                    'Red de contactos'
                  ]

    },
    {
      id: 'prevention',
      name: 'Prevención',
      icon: '🛡️',
      description: [
                    'Microchip obligatorio',
                    'Collar con GPS',
                    'Entrenamiento básico',
                    'Rutinas establecidas'
                  ]
    },
    {
  id: 'search',
  name: 'Búsqueda',
  icon: '🔍',
  description: [
                  'Acción rápida',
                  'Uso de redes sociales',
                  'Carteles efectivos',
                  'Búsqueda en diferentes horarios'
              ]
},
    {
      id: 'care',
      name: 'Cuidados',
      icon: '❤️',
description: [
                'Medicina preventiva',
                'Alimentación balanceada',
                'Ejercicio regular',
                'Revisiones veterinarias'
              ]
    }
  ];

  return (
    <section className={styles.categoriesSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Categorías de Aprendizaje</h2>
        <p className={styles.sectionDescription}>
          Haz clic en una categoría para ver sus consejos y obtener información detallada
        </p>
      </div>
      
      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${styles.categoryCard} ${
              selectedCategory === category.id ? styles.categoryActive : ''
            } ${clickedCategory === category.id ? styles.categoryClicked : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className={styles.categoryIcon}>{category.icon}</div>
            <h3 className={styles.categoryTitle}>{category.name}</h3>
            <div className={styles.categoryDescription}>
              {category.description.map((tip, idx) => (
                <p key={idx}>{tip}</p>
              ))}
            </div>

            <div className={styles.categoryArrow}>
              {selectedCategory === category.id ? '↓' : '→'}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
