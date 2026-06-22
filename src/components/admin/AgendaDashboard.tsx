"use client";
import { useState } from 'react';
import styles from './Admin.module.css';
import Calendar from '@/components/turnos/Calendar';

// Generate dynamic test data relative to current month
const getRelativeDate = (offsetDays: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const initialTurnos = [
  // Today
  { id: 1, client: 'María López', service: 'Color Completo (Medio)', date: getRelativeDate(0), time: '10:00', status: 'Realizado', senaPagada: true, price: 15000 },
  { id: 2, client: 'Juan Pérez', service: 'Barbería - Fade', date: getRelativeDate(0), time: '14:00', status: 'Agendado', senaPagada: false, price: 3500 },
  { id: 3, client: 'Lucía Gómez', service: 'Alisado (Largo)', date: getRelativeDate(0), time: '16:00', status: 'Agendado', senaPagada: true, price: 25000 },
  { id: 4, client: 'Sofía Martínez', service: 'Nutrición Capilar', date: getRelativeDate(0), time: '18:30', status: 'Cancelado', senaPagada: false, price: 8000 },
  // Tomorrow
  { id: 5, client: 'Carlos Rodríguez', service: 'Perfilado de Barba', date: getRelativeDate(1), time: '11:00', status: 'Agendado', senaPagada: false, price: 2000 },
  { id: 6, client: 'Ana Silva', service: 'Balayage (Extralargo)', date: getRelativeDate(1), time: '15:00', status: 'Agendado', senaPagada: true, price: 35000 },
  // Day after tomorrow
  { id: 7, client: 'Micaela Torres', service: 'Lavado y Peinado', date: getRelativeDate(2), time: '10:00', status: 'Agendado', senaPagada: false, price: 5000 },
  { id: 8, client: 'Pedro Castillo', service: 'Corte Moderno', date: getRelativeDate(2), time: '17:00', status: 'Agendado', senaPagada: true, price: 3500 },
];

export default function AgendaDashboard() {
  const todayDate = new Date();
  const dateString = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;
  
  const [selectedDate, setSelectedDate] = useState(dateString);
  const [turnos, setTurnos] = useState(initialTurnos);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTurno, setNewTurno] = useState({
    client: '', service: '', date: dateString, time: '10:00', price: 0, senaPagada: false
  });

  const toggleSena = (id: number) => {
    setTurnos(turnos.map(t => t.id === id ? { ...t, senaPagada: !t.senaPagada } : t));
  };

  const changeStatus = (id: number, newStatus: string) => {
    setTurnos(turnos.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const eliminarTurno = (id: number) => {
    if(confirm('¿Estás seguro de que deseas eliminar este turno?')) {
      setTurnos(turnos.filter(t => t.id !== id));
    }
  };

  const handleAgregarTurno = (e: React.FormEvent) => {
    e.preventDefault();
    const turnoObj = {
      id: Date.now(),
      client: newTurno.client,
      service: newTurno.service,
      date: newTurno.date,
      time: newTurno.time,
      price: Number(newTurno.price),
      senaPagada: newTurno.senaPagada,
      status: 'Agendado'
    };
    
    setTurnos([...turnos, turnoObj]);
    setIsModalOpen(false);
    setNewTurno({ client: '', service: '', date: selectedDate, time: '10:00', price: 0, senaPagada: false });
  };

  const turnosDelDia = turnos.filter(t => t.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time));
  const totalIngresos = turnosDelDia.filter(t => t.status === 'Realizado').reduce((acc, t) => acc + t.price, 0);
  const totalProyectado = turnosDelDia.reduce((acc, t) => acc + t.price, 0);

  return (
    <div className={styles.agendaLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarSticky}>
          <h2 className={styles.sidebarTitle}>Filtrar por Día</h2>
          <Calendar 
            selectedDate={selectedDate} 
            onSelectDate={(date) => {
              setSelectedDate(date);
              setNewTurno({ ...newTurno, date: date }); // Sync modal date
            }} 
          />
        </div>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Agenda de Turnos</h1>
            <p className={styles.pageSubtitle}>Gestión diaria de clientes para el {selectedDate}.</p>
          </div>
          <button className={styles.primaryBtn} onClick={() => setIsModalOpen(true)}>
            + Nuevo Turno
          </button>
        </div>

        <div className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <h3>Citas del Día</h3>
            <div className={styles.kpiValue}>{turnosDelDia.length}</div>
          </div>
          <div className={styles.kpiCard}>
            <h3>Ingreso Realizado</h3>
            <div className={styles.kpiValue}>${totalIngresos.toLocaleString('es-AR')}</div>
          </div>
          <div className={styles.kpiCard}>
            <h3>Ingreso Proyectado</h3>
            <div className={styles.kpiValue}>${totalProyectado.toLocaleString('es-AR')}</div>
          </div>
        </div>

        <div className={styles.tableContainer}>
          {turnosDelDia.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Hora</th>
                  <th>Precio Est.</th>
                  <th>Seña</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {turnosDelDia.map(t => (
                  <tr key={t.id}>
                    <td data-label="Cliente"><span className={styles.clientName}>{t.client}</span></td>
                    <td data-label="Servicio">{t.service}</td>
                    <td data-label="Hora">{t.time}</td>
                    <td data-label="Precio Est.">${t.price.toLocaleString('es-AR')}</td>
                    <td data-label="Seña">
                      <button 
                        className={`${styles.badgeBtn} ${t.senaPagada ? styles.bgGold : styles.bgGray}`}
                        onClick={() => toggleSena(t.id)}
                      >
                        {t.senaPagada ? 'Pagada' : 'Pendiente'}
                      </button>
                    </td>
                    <td data-label="Estado">
                      <span className={`${styles.statusBadge} ${t.status === 'Realizado' ? styles.bgGreen : t.status === 'Cancelado' ? styles.bgRed : styles.bgBlue}`}>
                        {t.status}
                      </span>
                    </td>
                    <td data-label="Acciones">
                      <div className={styles.actionGroup}>
                        <select 
                          className={styles.selectAction}
                          value={t.status}
                          onChange={(e) => changeStatus(t.id, e.target.value)}
                        >
                          <option value="Agendado">Agendado</option>
                          <option value="Realizado">Realizado</option>
                          <option value="Cancelado">Cancelado</option>
                        </select>
                        <button className={styles.deleteBtn} onClick={() => eliminarTurno(t.id)} title="Eliminar turno">
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.emptyState}>
              No hay turnos agendados para este día.
            </div>
          )}
        </div>
      </main>

      {/* Modal Nuevo Turno */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Crear Nuevo Turno</h2>
            <form onSubmit={handleAgregarTurno} className={styles.modalForm}>
              
              <div className={styles.formGroup}>
                <label>Nombre del Cliente</label>
                <input 
                  type="text" 
                  required 
                  value={newTurno.client}
                  onChange={e => setNewTurno({...newTurno, client: e.target.value})}
                  placeholder="Ej. Ana García"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Servicio</label>
                <input 
                  type="text" 
                  required 
                  value={newTurno.service}
                  onChange={e => setNewTurno({...newTurno, service: e.target.value})}
                  placeholder="Ej. Corte y Peinado"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Fecha</label>
                  <input 
                    type="date" 
                    required 
                    value={newTurno.date}
                    onChange={e => setNewTurno({...newTurno, date: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Hora</label>
                  <input 
                    type="time" 
                    required 
                    value={newTurno.time}
                    onChange={e => setNewTurno({...newTurno, time: e.target.value})}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Precio Estimado ($)</label>
                  <input 
                    type="number" 
                    required 
                    min="0"
                    value={newTurno.price}
                    onChange={e => setNewTurno({...newTurno, price: Number(e.target.value)})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      checked={newTurno.senaPagada}
                      onChange={e => setNewTurno({...newTurno, senaPagada: e.target.checked})}
                    />
                    ¿Seña Pagada?
                  </label>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className={styles.saveBtn}>Guardar Turno</button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
