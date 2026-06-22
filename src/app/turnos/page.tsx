import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TurnosForm from '@/components/turnos/TurnosForm';
import styles from './page.module.css';

export default function TurnosPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Reservar Cita</h1>
          <p className={styles.subtitle}>Selecciona el servicio y horario de tu preferencia.</p>
          <TurnosForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
