"use client";
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="contacto" className={`${styles.section} ${isVisible ? styles.visible : ''}`} ref={ref}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Visítanos</h2>
          <div className={styles.divider}></div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.infoCard} style={{ animationDelay: '0.4s' }}>
            <h3 className={styles.cardTitle}>Ubicación</h3>
            <p>Mendoza, X5016 Malagüeño,<br />Córdoba, Argentina</p>
          </div>
          
          <div className={styles.infoCard} style={{ animationDelay: '0.8s' }}>
            <h3 className={styles.cardTitle}>Horarios</h3>
            <p>Martes a Sábado</p>
            <p className={styles.highlight}>10:00 AM - 9:00 PM</p>
            <p className={styles.closed}>Domingo y Lunes: Cerrado</p>
          </div>
        </div>
      </div>
    </section>
  );
}
