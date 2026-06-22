"use client";
import { useState } from 'react';
import styles from './TurnosForm.module.css';
import Calendar from './Calendar';

const servicesList = [
  { id: 'corte_barberia', name: 'Barbería (Corte / Barba)', requiresLength: false, durationMin: 45 },
  { id: 'tratamiento', name: 'Tratamiento Capilar', requiresLength: true, durationMin: 60 },
  { id: 'color', name: 'Servicio de Color / Decoloración', requiresLength: true, durationMin: 120 }
];

const lengths = [
  { id: 'corto', name: 'Corto', timeMultiplier: 1 },
  { id: 'medio', name: 'Medio', timeMultiplier: 1.5 },
  { id: 'largo', name: 'Largo', timeMultiplier: 2 },
  { id: 'extralargo', name: 'Súper Largo', timeMultiplier: 2.5 }
];

const availableTimes = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

export default function TurnosForm() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedLength, setSelectedLength] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const activeService = servicesList.find(s => s.id === selectedService);

  const canProceedToStep2 = selectedService && (!activeService?.requiresLength || selectedLength);
  const canProceedToStep3 = selectedDate && selectedTime;

  const handleAgendar = () => {
    // Redirección a WhatsApp
    const phone = "5493510000000"; // Reemplazar por el número de Celeste
    const serviceName = activeService?.name;
    const lengthStr = activeService?.requiresLength ? ` (Pelo ${lengths.find(l => l.id === selectedLength)?.name})` : '';
    const message = `¡Hola Celeste! Quiero agendar un turno para ${serviceName}${lengthStr} el día ${selectedDate} a las ${selectedTime}hs.`;
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setStep(4);
  };

  return (
    <div className={styles.formContainer}>
      {step === 1 && (
        <div className={styles.step}>
          <h3 className={styles.stepTitle}>Paso 1: Servicio</h3>
          
          <label className={styles.label}>¿Qué servicio buscas?</label>
          <div className={styles.optionsGrid}>
            {servicesList.map(srv => (
              <button 
                key={srv.id}
                className={`${styles.optionBtn} ${selectedService === srv.id ? styles.selected : ''}`}
                onClick={() => { setSelectedService(srv.id); setSelectedLength(''); }}
              >
                {srv.name}
              </button>
            ))}
          </div>

          {activeService?.requiresLength && (
            <div className={styles.lengthSection}>
              <label className={styles.label}>Largo del cabello:</label>
              <div className={styles.optionsGrid}>
                {lengths.map(len => (
                  <button 
                    key={len.id}
                    className={`${styles.optionBtn} ${selectedLength === len.id ? styles.selected : ''}`}
                    onClick={() => setSelectedLength(len.id)}
                  >
                    {len.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button 
            className={styles.nextBtn} 
            disabled={!canProceedToStep2}
            onClick={() => setStep(2)}
          >
            Siguiente
          </button>
        </div>
      )}

      {step === 2 && (
        <div className={styles.step}>
          <h3 className={styles.stepTitle}>Paso 2: Fecha y Hora</h3>
          
          <label className={styles.label}>Selecciona la Fecha:</label>
          <Calendar 
            selectedDate={selectedDate}
            onSelectDate={(date) => {
              setSelectedDate(date);
              setSelectedTime('');
            }}
          />

          {selectedDate && (
            <div className={styles.timeSection}>
              <label className={styles.label}>Horarios Disponibles:</label>
              <div className={styles.timeGrid}>
                {availableTimes.map(time => (
                  <button 
                    key={time}
                    className={`${styles.timeBtn} ${selectedTime === time ? styles.selectedTime : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.buttonRow}>
            <button className={styles.backBtn} onClick={() => setStep(1)}>Atrás</button>
            <button 
              className={styles.nextBtn} 
              disabled={!canProceedToStep3}
              onClick={() => setStep(3)}
            >
              Confirmar
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.step}>
          <h3 className={styles.stepTitle}>Paso 3: Confirmación</h3>
          
          <div className={styles.summaryCard}>
            <p><strong>Servicio:</strong> {activeService?.name}</p>
            {activeService?.requiresLength && <p><strong>Largo:</strong> {lengths.find(l => l.id === selectedLength)?.name}</p>}
            <p><strong>Fecha:</strong> {selectedDate}</p>
            <p><strong>Hora:</strong> {selectedTime}</p>
          </div>

          <p className={styles.instruction}>
            Al hacer clic en "Agendar por WhatsApp", se abrirá un chat directo con Celeste para confirmar tu turno.
          </p>

          <div className={styles.buttonRow}>
            <button className={styles.backBtn} onClick={() => setStep(2)}>Atrás</button>
            <button className={styles.whatsappBtn} onClick={handleAgendar}>
              Agendar por WhatsApp
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className={styles.step}>
          <div className={styles.successMessage}>
            <h3 className={styles.stepTitle}>¡Redirigiendo a WhatsApp!</h3>
            <p>Si la ventana no se abrió, intenta nuevamente o contáctanos directamente a nuestro número.</p>
            <button className={styles.nextBtn} onClick={() => {
              setStep(1); setSelectedService(''); setSelectedDate(''); setSelectedTime('');
            }}>Agendar otro turno</button>
          </div>
        </div>
      )}
    </div>
  );
}
