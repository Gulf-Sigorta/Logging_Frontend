import React, { useState, useEffect } from "react";

function Logs() {
  const [logs, setLogs] = useState([]);

  // Eğer gerçek API varsa burada fetch ile veriyi çekebilirsin
  useEffect(() => {
    // Örnek olarak sabit logları set ettik
    setLogs([
      { id: 1, message: "Kullanıcı giriş yaptı", timestamp: "2025-07-10 10:00:00" },
      { id: 2, message: "Hata: Bağlantı zaman aşımı", timestamp: "2025-07-10 10:05:12" },
      { id: 3, message: "Kullanıcı çıkış yaptı", timestamp: "2025-07-10 10:15:30" },
    ]);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Log Kayıtları</h1>
      <ul>
        {logs.map((log) => (
          <li key={log.id} className="border-b py-2">
            <div><strong>Zaman:</strong> {log.timestamp}</div>
            <div><strong>Mesaj:</strong> {log.message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Logs;
