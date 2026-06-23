"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAdmin } from '@/app/actions/auth';
import styles from '@/app/admin/AdminLayout.module.css';

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Capture PWA install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    // Force a full page reload to clear browser cache and re-evaluate middleware auth status
    window.location.href = '/admin/login'; 
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className={styles.adminContainer}>
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
        <h2 style={{color: 'var(--accent-gold)', margin: 0, fontFamily: 'var(--font-heading)'}}>Nairda Admin</h2>
        <button className={styles.hamburgerBtn} onClick={toggleSidebar}>☰</button>
      </div>

      {/* Overlay to close sidebar by clicking outside on mobile */}
      <div 
        className={`${styles.overlay} ${isSidebarOpen ? styles.overlayOpen : ''}`} 
        onClick={closeSidebar}
      ></div>

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.logoArea}>
          <h2>Nairda Admin</h2>
          <button className={styles.closeBtn} onClick={closeSidebar}>✕</button>
        </div>
        <nav className={styles.nav}>
          <Link href="/admin/agenda" onClick={closeSidebar} className={`${styles.navLink} ${pathname === '/admin/agenda' ? styles.active : ''}`}>📅 Agenda</Link>
          <Link href="/admin/finanzas" onClick={closeSidebar} className={`${styles.navLink} ${pathname === '/admin/finanzas' ? styles.active : ''}`}>💰 Finanzas</Link>
          
          {deferredPrompt && (
            <button onClick={handleInstallClick} className={styles.installBtn}>📱 Instalar App</button>
          )}

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
