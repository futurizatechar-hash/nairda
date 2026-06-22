"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/app/actions/auth';
import styles from './Login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const res = await loginAdmin(formData);

    if (res.success) {
      // Refresh the router to apply middleware state and redirect safely
      router.push('/admin/agenda');
      router.refresh();
    } else {
      setError(res.error || 'Error desconocido');
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.logo}>Nairda Studio</h1>
        <p className={styles.subtitle}>Panel de Administración Exclusivo</p>

        {error && (
          <div className={styles.errorMsg}>
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Usuario</label>
            <input 
              type="text" 
              name="user" 
              className={styles.input} 
              required 
              placeholder="Tu usuario" 
              autoComplete="username"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Contraseña</label>
            <input 
              type="password" 
              name="pass" 
              className={styles.input} 
              required 
              placeholder="••••••" 
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}
