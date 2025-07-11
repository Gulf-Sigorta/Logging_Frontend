import React from 'react';
import styles from './LogTable.module.css';

const LogTable = ({ logs }) => {
  return (
    <table className={styles.logTable}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Level</th>
          <th>Message</th>
          <th>Timestamp</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        {logs.map(log => (
          <tr key={log.id} className={styles.row}>
            <td>{log.id}</td>
            <td className={styles[getLevelClass(log.level)]}>{log.level}</td>
            <td>{log.message}</td>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
            <td>{log.source}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function getLevelClass(level) {
  switch(level) {
    case 'ERROR': return 'error';
    case 'WARN': return 'warn';
    case 'INFO': return 'info';
    case 'DEBUG': return 'debug';
    default: return '';
  }
}

export default LogTable;
