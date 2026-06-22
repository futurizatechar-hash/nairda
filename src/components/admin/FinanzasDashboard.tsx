"use client";
import { useState } from 'react';
import styles from './Admin.module.css';

export default function FinanzasDashboard() {
  const [cajaDiaria, setCajaDiaria] = useState({
    efectivo: 15000,
    transferencia: 8500,
    credito: 0
  });

  const [movimientos, setMovimientos] = useState([
    { id: 1, type: 'Ingreso', category: 'Servicios', amount: 15000, method: 'Efectivo', desc: 'Color María López' },
    { id: 2, type: 'Ingreso', category: 'Servicios', amount: 8500, method: 'Transferencia', desc: 'Alisado parte 1' },
    { id: 3, type: 'Gasto', category: 'Insumos', amount: 5000, method: 'Efectivo', desc: 'Compra Tinturas' },
  ]);

  const totalCaja = cajaDiaria.efectivo + cajaDiaria.transferencia + cajaDiaria.credito;
  const ingresosTotales = movimientos.filter(m => m.type === 'Ingreso').reduce((acc, m) => acc + m.amount, 0);
  const gastosTotales = movimientos.filter(m => m.type === 'Gasto').reduce((acc, m) => acc + m.amount, 0);
  const neto = ingresosTotales - gastosTotales;

  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('Ingreso');
  const [method, setMethod] = useState('Efectivo');
  const [category, setCategory] = useState('Servicios'); 

  const handleAdd = () => {
    if (!amount) return;
    const val = parseFloat(amount);
    setMovimientos([{ id: Date.now(), type, category, amount: val, method, desc }, ...movimientos]);
    if (type === 'Ingreso') {
      setCajaDiaria(prev => ({
        ...prev,
        [method.toLowerCase()]: prev[method.toLowerCase() as keyof typeof prev] + val
      }));
    } else {
      setCajaDiaria(prev => ({
        ...prev,
        [method.toLowerCase()]: prev[method.toLowerCase() as keyof typeof prev] - val
      }));
    }
    setAmount(''); setDesc('');
  };

  return (
    <div>
      <h1 className={styles.pageTitle}>Finanzas</h1>
      <p className={styles.pageSubtitle}>Control de caja diaria, ingresos y gastos.</p>

      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <h3>Caja de Hoy (Total)</h3>
          <p className={styles.kpiValue}>${totalCaja}</p>
          <div className={styles.kpiDetails}>
            <span>Efectivo: ${cajaDiaria.efectivo}</span>
            <span>Transf/MP: ${cajaDiaria.transferencia}</span>
            <span>Crédito: ${cajaDiaria.credito}</span>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <h3>Ingresos Netos (General)</h3>
          <p className={`${styles.kpiValue} ${neto >= 0 ? styles.textGreen : styles.textRed}`}>${neto}</p>
          <div className={styles.kpiDetails}>
            <span>Ingresos: ${ingresosTotales}</span>
            <span>Gastos: ${gastosTotales}</span>
          </div>
        </div>
      </div>

      <div className={styles.financePanel}>
        <div className={styles.formSection}>
          <h2>Registrar Movimiento</h2>
          <div className={styles.formGroup}>
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="Ingreso">Ingreso</option>
              <option value="Gasto">Gasto</option>
            </select>
          </div>
          {type === 'Ingreso' && (
            <div className={styles.formGroup}>
              <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="Servicios">Servicios</option>
                <option value="Venta de Productos">Venta de Productos</option>
              </select>
            </div>
          )}
          {type === 'Gasto' && (
            <div className={styles.formGroup}>
              <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="Insumos">Variables (Insumos, Luz)</option>
                <option value="Fijos">Fijos (Alquiler)</option>
              </select>
            </div>
          )}
          <div className={styles.formGroup}>
            <input type="number" placeholder="Monto $" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <select value={method} onChange={e => setMethod(e.target.value)}>
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia / MP</option>
              <option value="Credito">Crédito</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <input type="text" placeholder="Descripción breve" value={desc} onChange={e => setDesc(e.target.value)} />
          </div>
          <button className={styles.submitBtn} onClick={handleAdd}>Guardar</button>
        </div>

        <div className={styles.historySection}>
          <h2>Historial de Movimientos</h2>
          <ul className={styles.historyList}>
            {movimientos.map(m => (
              <li key={m.id} className={styles.historyItem}>
                <div>
                  <strong>{m.desc}</strong>
                  <span className={styles.itemMeta}>{m.category} | {m.method}</span>
                </div>
                <div className={`${styles.itemAmount} ${m.type === 'Ingreso' ? styles.textGreen : styles.textRed}`}>
                  {m.type === 'Ingreso' ? '+' : '-'}${m.amount}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
