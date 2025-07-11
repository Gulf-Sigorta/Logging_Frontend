import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogTable from '../components/LogTable/LogTable';
import LogFilter from '../components/LogFilter/LogFilter';
import Pagination from '../components/Pagination/Pagination';


const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const levels = ['ERROR', 'WARNING', 'INFO', 'DEBUG'];
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

      <LogFilter
        levels={levels}
        selectedLevel={selectedLevel}
        onChange={(level) => {
          setSelectedLevel(level);
          setPage(0);
        }}
      />

      <div style={{ marginTop: '20px' }}>
        <LogTable logs={logs} />
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};



export default Logs;
