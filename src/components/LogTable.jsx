import React from 'react';

const LogTable = ({ logs }) => {
  return (
    <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
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
          <tr key={log.id}>
            <td>{log.id}</td>
            <td style={{ color: getLevelColor(log.level) }}>{log.level}</td>
            <td>{log.message}</td>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
            <td>{log.source}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Log seviyesi renkleri için yardımcı fonksiyon
function getLevelColor(level) {
  switch(level) {
    case 'ERROR': return 'red';
    case 'WARN': return 'orange';
    case 'INFO': return 'green';
    case 'DEBUG': return 'gray';
    default: return 'black';
  }
}

export default LogTable;
