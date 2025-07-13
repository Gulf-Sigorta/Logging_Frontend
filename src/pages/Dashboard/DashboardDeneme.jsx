import React from "react";
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
  { id: 3, level: "DEBUG", timestamp: "2025-07-11 08:20:00" },
  { id: 4, level: "ERROR", timestamp: "2025-07-11 08:30:00" },
  { id: 5, level: "DEBUG", timestamp: "2025-07-11 08:40:00" },
  { id: 6, level: "INFO", timestamp: "2025-07-11 08:50:00" },
  { id: 7, level: "DEBUG", timestamp: "2025-07-11 09:00:00" },
  { id: 8, level: "ERROR", timestamp: "2025-07-11 09:10:00" },
  { id: 9, level: "INFO", timestamp: "2025-07-11 09:20:00" },
];

// Seviyeye özel renkler
const COLORS = {
  ERROR: "rgba(255, 76, 76, 0.8)",
  WARN: "rgba(255, 165, 0, 0.8)",
  INFO: "rgba(76, 154, 255, 0.8)",
  DEBUG: "#20bf6b",
};

const DashboardDeneme = () => {
  const levels = ["DEBUG", "INFO", "ERROR", "WARN"];

  // Saat bazlı ve seviye bazlı log gruplama
  const timeLevelCounts = {};
  logs.forEach(({ level, timestamp }) => {
    const hour = timestamp.slice(11, 13);
    if (!timeLevelCounts[hour]) {
      timeLevelCounts[hour] = { DEBUG: 0, INFO: 0, ERROR: 0, WARN: 0 };
    }
    timeLevelCounts[hour][level]++;
  });

  const barData = Object.entries(timeLevelCounts)
    .sort((a, b) => a[0] - b[0])
    .map(([hour, counts]) => ({
      hour: `${hour}:00`,
      ...counts,
    }));

  const levelCounts = logs.reduce((acc, { level }) => {
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className={styles.contentArea}>
      {/* Log sayıları kartları */}
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

      {/* Grafikler */}
      <div className={styles.chartsContainer}>
        {/* Pie Chart */}
        <div className={styles.chartBox}>
          <h3>Log Seviyeleri</h3>
          <LogsPieChart />
        </div>

        {/* Bar Chart */}
        <div className={styles.chartBox}>
          <h3>Saat Bazlı Log Seviyesi Sayısı</h3>
          <BarChart
            width={400}
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
