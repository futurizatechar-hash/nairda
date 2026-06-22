import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <h2 className={styles.title}>Nairda Studio</h2>
          <p className={styles.subtitle}>Elegancia, Estilo y Profesión en cada detalle.</p>
        </div>
        <div className={styles.navLinks}>
          <Link href="#servicios" className={styles.link}>Servicios</Link>
          <Link href="#contacto" className={styles.link}>Contacto</Link>
          <Link href="/turnos" className={styles.btnLink}>Agendar Turno</Link>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} Nairda Studio. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
