import React from 'react';
import styles from './LogTable.module.css';

const LogTable = ({ logs }) => {
  return (
    <table className={styles.logTable}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Level</th>
          <th>Source</th>
          <th>Thread</th>
          <th>Message</th> 
        </tr>
      </thead>
      <tbody>
        {logs.map(log => (
          <tr key={log.id} className={styles.row}>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
            <td className={styles[getLevelClass(log.level)]}>{log.level}</td>
            <td>{log.source}</td>
            <td>{log.thread}</td> 
            <td>{log.message}</td>

          </tr>
        ))}
      </tbody>
    </table>
  );
};

function getLevelClass(level) {
  switch (level) {
    case 'ERROR': return 'error';
    case 'WARNING': return 'warn';
    case 'INFO': return 'info';
    case 'DEBUG': return 'debug';
    default: return '';
  }
}

export default LogTable;
