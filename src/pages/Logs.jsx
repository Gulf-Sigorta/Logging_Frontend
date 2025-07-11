import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogTable from '../components/LogTable/LogTable';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [page, setPage] = useState(0);      
  const [totalPages, setTotalPages] = useState(0);

  const levels = ['ERROR', 'WARN', 'INFO', 'DEBUG'];
  const pageSize = 15; 
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const baseUrl = selectedLevel 
          ? `http://localhost:8080/api/log/get-log-by-level/${selectedLevel}`
          : `http://localhost:8080/api/log`;

        const url = `${baseUrl}?page=${page}&size=${pageSize}`;
        const response = await axios.get(url);

        setLogs(response.data.content);       
        setTotalPages(response.data.totalPages); 
      } catch (err) {
        console.error('Loglar alınamadı:', err);
      }
    };
    fetchLogs();
  }, [selectedLevel, page]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Loglar</h2>

      <label>
        Log Seviyesi:
        <select
          value={selectedLevel}
          onChange={(e) => {
            setSelectedLevel(e.target.value);
            setPage(0);  // Seviye değişince sayfa 0'a dönsün
          }}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="">Tümü</option>
          {levels.map((level, idx) => (
            <option key={idx} value={level}>{level}</option>
          ))}
        </select>
      </label>

      <div style={{ marginTop: '20px' }}>
        <LogTable logs={logs} />
      </div>

      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => setPage(page - 1)} 
          disabled={page === 0}
          style={{ marginRight: '10px' }}
        >
          Önceki
        </button>

        <span>Sayfa {page + 1} / {totalPages}</span>

        <button 
          onClick={() => setPage(page + 1)} 
          disabled={page + 1 === totalPages}
          style={{ marginLeft: '10px' }}
        >
          Sonraki
        </button>
      </div>
    </div>
  );
};

export default Logs;
