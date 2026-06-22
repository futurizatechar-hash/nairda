"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logoutAdmin } from '@/app/actions/auth';
import styles from './AdminLayout.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const isLoginPage = pathname === '/admin/login';

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/admin/login');
  };

  if (isLoginPage) {
    // Return children directly without the sidebar/layout wrappers
    return <>{children}</>;
  }

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>
          <h2>Nairda Admin</h2>
        </div>
        <nav className={styles.nav}>
          <Link href="/admin/agenda" className={`${styles.navLink} ${pathname === '/admin/agenda' ? styles.active : ''}`}>📅 Agenda</Link>
          <Link href="/admin/finanzas" className={`${styles.navLink} ${pathname === '/admin/finanzas' ? styles.active : ''}`}>💰 Finanzas</Link>
          
          <button onClick={handleLogout} className={styles.logoutBtn}>🚪 Cerrar Sesión</button>
          
          <Link href="/" className={styles.navLink} style={{marginTop: 'auto', color: '#888'}}>← Volver a la Web</Link>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
