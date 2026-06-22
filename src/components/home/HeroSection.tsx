import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      {/* Decorative animated elements */}
      <div className={styles.glow1}></div>
      <div className={styles.glow2}></div>
      
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeIcon}>✦</span> ESTUDIO PREMIUM
        </div>
        <h1 className={styles.title}>
          El Arte de tu <br />
          <span className={styles.goldText}>Mejor Versión</span>
        </h1>
        <p className={styles.subtitle}>
          Descubre una experiencia de cuidado personal inigualable.
        </p>
        <div className={styles.actionContainer}>
          <Link href="/turnos" className={styles.primaryBtn}>
            <span>Reservar Cita</span>
          </Link>
          <Link href="#servicios" className={styles.secondaryBtn}>
            Explorar Servicios
          </Link>
        </div>
      </div>
      
      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
      </div>
    </section>
  );
}
