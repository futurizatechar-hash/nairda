"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoText}>
            NAIRDA<span>STUDIO</span>
          </Link>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          className={styles.mobileToggle} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div className={`${styles.links} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
          {/* Mobile Only Premium Elements */}
          <div className={styles.mobileMenuHeader}>
            <span className={styles.mobileLogoText}>
              NAIRDA<span>STUDIO</span>
            </span>
            <div className={styles.mobileDivider}></div>
          </div>

          <Link href="#servicios" className={styles.link} onClick={() => setMobileMenuOpen(false)}>Servicios</Link>
          <Link href="#contacto" className={styles.link} onClick={() => setMobileMenuOpen(false)}>Contacto</Link>
          <Link href="/turnos" className={styles.btnGold} onClick={() => setMobileMenuOpen(false)}>
            Agendar Turno
          </Link>

          <div className={styles.mobileMenuFooter}>
            <p>Mendoza, X5016 Malagüeño</p>
            <p>Córdoba, Argentina</p>
          </div>
        </div>
      </nav>
    </header>
  );
}
