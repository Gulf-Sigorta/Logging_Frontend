import React from 'react';
import styles from './LogFilter.module.css';

const LogFilter = ({ levels, selectedLevel, onChange }) => (
  <label className={styles.filterLabel}>
    Log Seviyesi:
    <select
      className={styles.filterSelect}
      value={selectedLevel}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Tümü</option>
      {levels.map((level, idx) => (
        <option key={idx} value={level}>
          {level}
        </option>
      ))}
    </select>
  </label>
);

export default LogFilter;
