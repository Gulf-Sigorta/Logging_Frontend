import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import styles from "./Dashboard.module.css";
import LogsPieChart from "../../components/Chart/LogsPieChart/LogsPieChart";

// Örnek log verileri
const logs = [
  { id: 1, level: "DEBUG", timestamp: "2025-07-11 00:15:00" },
  { id: 2, level: "INFO", timestamp: "2025-07-11 01:20:00" },
  { id: 3, level: "ERROR", timestamp: "2025-07-11 01:45:00" },
  { id: 4, level: "WARN", timestamp: "2025-07-11 02:10:00" },
  { id: 5, level: "DEBUG", timestamp: "2025-07-11 03:05:00" },
  { id: 6, level: "INFO", timestamp: "2025-07-11 03:25:00" },
  { id: 7, level: "ERROR", timestamp: "2025-07-11 04:50:00" },
  { id: 8, level: "WARN", timestamp: "2025-07-11 05:05:00" },
  { id: 9, level: "DEBUG", timestamp: "2025-07-11 05:20:00" },
  { id: 10, level: "INFO", timestamp: "2025-07-11 06:30:00" },
  { id: 11, level: "ERROR", timestamp: "2025-07-11 07:40:00" },
  { id: 12, level: "WARN", timestamp: "2025-07-11 08:50:00" },
  { id: 13, level: "DEBUG", timestamp: "2025-07-11 09:15:00" },
  { id: 14, level: "INFO", timestamp: "2025-07-11 09:20:00" },
  { id: 15, level: "ERROR", timestamp: "2025-07-11 10:30:00" },
  { id: 16, level: "WARN", timestamp: "2025-07-11 11:40:00" },
  { id: 17, level: "DEBUG", timestamp: "2025-07-11 12:10:00" },
  { id: 18, level: "INFO", timestamp: "2025-07-11 13:25:00" },
  { id: 19, level: "ERROR", timestamp: "2025-07-11 13:50:00" },
  { id: 20, level: "WARN", timestamp: "2025-07-11 14:05:00" },
  { id: 21, level: "DEBUG", timestamp: "2025-07-11 15:20:00" },
  { id: 22, level: "INFO", timestamp: "2025-07-11 16:30:00" },
  { id: 23, level: "ERROR", timestamp: "2025-07-11 17:40:00" },
  { id: 24, level: "WARN", timestamp: "2025-07-11 18:50:00" },
  { id: 25, level: "DEBUG", timestamp: "2025-07-11 19:15:00" },
  { id: 26, level: "INFO", timestamp: "2025-07-11 20:20:00" },
  { id: 27, level: "ERROR", timestamp: "2025-07-11 21:30:00" },
  { id: 28, level: "WARN", timestamp: "2025-07-11 21:50:00" },
  { id: 29, level: "DEBUG", timestamp: "2025-07-11 22:10:00" },
  { id: 30, level: "INFO", timestamp: "2025-07-11 23:25:00" },
  { id: 31, level: "ERROR", timestamp: "2025-07-11 23:50:00" },
];

const COLORS = {
  ERROR: "rgba(255, 76, 76, 0.8)",
  WARN: "rgba(255, 165, 0, 0.8)",
  INFO: "rgba(76, 154, 255, 0.8)",
  DEBUG: "#20bf6b",
};

const DashboardDeneme = () => {
  const levels = ["DEBUG", "INFO", "ERROR", "WARN"];

  // Saat bazlı loglar
  const timeLevelCounts = {};
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, "0");
    timeLevelCounts[hour] = { DEBUG: 0, INFO: 0, ERROR: 0, WARN: 0 };
  }
  logs.forEach(({ level, timestamp }) => {
    const hour = timestamp.slice(11, 13);
    if (timeLevelCounts[hour]) {
      timeLevelCounts[hour][level]++;
    }
  });
  const barData = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return {
    hour: `${hour}:00`,
    ...timeLevelCounts[hour],
  };
});
  const levelCounts = logs.reduce((acc, { level }) => {
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});

  // Canlı saat için state
  const [clock, setClock] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.contentArea}>
      {/* Yaratıcı üst alan */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "40px 130px 30px 130px",
        gap: 20,
        flexWrap: "wrap"
      }}>
        {/* Hoşgeldin */}
        <div style={{ flex: 1, minWidth: 180 }}>
          <h2 style={{ margin: 0, color: "#1a237e" }}>Hoşgeldiniz!</h2>
          <p style={{ margin: 0, fontWeight: 500 }}>GİG Sigorta Log Dashboard</p>
        </div>
        {/* Canlı saat */}
        <div style={{
          flex: 1,
          minWidth: 220,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: 2,
            color: "#222",
            background: "rgba(255,255,255,0.7)",
            borderRadius: 12,
            padding: "12px 32px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}>
            {clock.toLocaleTimeString("tr-TR")}
          </div>
          <span style={{ fontSize: 16, color: "#666", marginTop: 6 }}>
            {clock.toLocaleDateString("tr-TR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </span>
        </div>
        {/* Slogan veya motivasyon */}
        <div style={{ flex: 1, minWidth: 180, textAlign: "right" }}>
          <span style={{
            fontStyle: "italic",
            color: "#1976d2",
            fontWeight: 500,
            fontSize: 24
          }}>
            "Aklımız Hep Sizde."
          </span>
        </div>
      </div>

      {/* Log kartları ve Pie Chart */}
      <div className={styles.statsGrid}>
        {levels.map((level) => (
          <div
            key={level}
            className={`${styles.statCard} ${styles[level.toLowerCase()]}`}
          >
            <h3>{level}</h3>
            <p>{levelCounts[level] || 0}</p>
          </div>
        ))}
      </div>

      <div className={styles.chartsContainer}>
        <div className={styles.chartBox}>
          <h3>Log Seviyeleri</h3>
          <LogsPieChart />
        </div>
      </div>

      {/* Duyuru kutusu */}
      <div
        style={{
          margin: "40px auto 0 auto",
          maxWidth: 600,
          background: "rgba(255,255,255,0.85)",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h2>DUYURU</h2>
        <p>
          Sistem bakımı 15 Temmuz 2025 tarihinde 02:00-03:00 saatleri arasında yapılacaktır.<br />
          Bu süre zarfında dashboard geçici olarak erişilemeyebilir.
        </p>
      </div>

      {/* Saat bazlı log seviyesi tablosu en altta */}
      <div className={styles.chartsContainer} style={{ marginTop: 40 }}>
        <div className={styles.chartBox}>
          <h3>Saat Bazlı Log Seviyesi Sayısı</h3>
          <BarChart
            width={600}
            height={300}
            data={barData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            {levels.map((level) => (
              <Bar
                key={level}
                dataKey={level}
                stackId="a"
                fill={COLORS[level]}
              />
            ))}
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default DashboardDeneme;