"use client";
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import styles from './ServicesSection.module.css';

const services = [
  {
    id: 'tratamientos',
    title: 'Tratamientos Capilares',
    description: 'Recuperá la salud y el brillo de tu pelo. Tratamientos personalizados según el diagnóstico de tu cabello.',
    items: ['Nutrición', 'Ritual plex', 'Células madres', 'Alisado', 'Nanoplastia', 'Lavado y Peinado']
  },
  {
    id: 'colorimetria',
    title: 'Servicios de Color',
    description: 'Colores vibrantes, uniformes y a tu estilo. Desde tonos naturales hasta fantasía.',
    items: ['Color Completo', 'Tintura de Raíz', 'Balayage', 'Babylight', 'Contouring', 'Decoloración completa']
  },
  {
    id: 'barberia',
    title: 'Barbería',
    description: 'Más que un corte, una experiencia. Asesoramiento de imagen para que encuentres tu mejor versión.',
    items: ['Cortes modernos', 'Fades', 'Degradados', 'Perfilado de barba']
  }
];

export default function ServicesSection() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="servicios" className={`${styles.section} ${isVisible ? styles.visible : ''}`} ref={ref}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nuestros Servicios</h2>
          <div className={styles.divider}></div>
        </div>
        
        <div className={styles.grid}>
          {services.map((service, cardIndex) => (
            <div key={service.id} className={styles.card} style={{ animationDelay: `${cardIndex * 0.4}s` }}>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
              <ul className={styles.itemList}>
                {service.items.map((item, index) => (
                  <li key={index} style={{ animationDelay: `${(cardIndex * 0.4) + (index * 0.15) + 0.6}s` }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
