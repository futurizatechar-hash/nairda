"use client";
import { useState } from 'react';
import styles from './Calendar.module.css';

interface CalendarProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export default function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay(); // 0 is Sunday

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
  }

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
    const dayOfWeek = dateObj.getDay();
    // 0 is Sunday, 1 is Monday.
    const isPast = dateObj < today;
    const isClosed = dayOfWeek === 0 || dayOfWeek === 1;
    const isDisabled = isPast || isClosed;
    
    // Format YYYY-MM-DD
    const dateString = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isSelected = selectedDate === dateString;

    days.push(
      <button 
        key={d} 
        className={`${styles.dayBtn} ${isSelected ? styles.selected : ''} ${isDisabled ? styles.disabled : ''}`}
        disabled={isDisabled}
        onClick={() => onSelectDate(dateString)}
        type="button"
      >
        {d}
      </button>
    );
  }

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <button type="button" onClick={prevMonth} className={styles.navBtn}>&lt;</button>
        <div className={styles.monthLabel}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button type="button" onClick={nextMonth} className={styles.navBtn}>&gt;</button>
      </div>
      <div className={styles.weekDays}>
        <span>Dom</span><span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span>
      </div>
      <div className={styles.daysGrid}>
        {days}
      </div>
    </div>
  );
}
