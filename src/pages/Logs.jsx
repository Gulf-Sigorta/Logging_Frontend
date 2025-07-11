import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogTable from '../components/LogTable/LogTable';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/log')
      .then(response => setLogs(response.data))
      .catch(error => console.error('Error fetching logs:', error));
  }, []);

  return (
    <div>
      <h1>Logs</h1>
      <LogTable logs={logs} />
    </div>
  );
};

export default Logs;
