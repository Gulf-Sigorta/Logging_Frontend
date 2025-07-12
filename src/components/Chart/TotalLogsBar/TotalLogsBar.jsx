import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import styles from "./TotalLogsBar.module.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const sampleData = {
  "2023-01": 12,
  "2023-02": 15,
  "2023-03": 7,
  "2023-04": 10,
  "2023-05": 20,
  "2023-06": 14,
  "2023-07": 25,
  "2023-08": 19,
  "2023-09": 30,
  "2023-10": 16,
  "2023-11": 11,
  "2023-12": 22,

  "2024-01": 20,
  "2024-02": 10,
  "2024-03": 30,
  "2024-04": 25,
  "2024-05": 18,
  "2024-06": 14,
  "2024-07": 23,
  "2024-08": 21,
  "2024-09": 17,
  "2024-10": 28,
  "2024-11": 16,
  "2024-12": 19,
};

export default function TotalLogsBar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    new Date(today.getFullYear(), 0, 1)
  );
  const selectedYear = selectedDate.getFullYear();

  const monthlyTotals = months.map((_, index) => {
    const monthNumber = (index + 1).toString().padStart(2, "0");
    const key = `${selectedYear}-${monthNumber}`;
    return sampleData[key] || 0;
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: `${selectedYear} Yılı Log Sayıları`,
        data: monthlyTotals,
        backgroundColor: "#3f51b5",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Çizim alanı container'ın boyutuna göre ayarlanır
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        precision: 0,
      },
    },
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Yıllık Log Dağılımı</h3>

      <div className={styles.datepickerWrapper}>
        <DatePicker
          selected={selectedDate}
          onChange={(date) =>
            setSelectedDate(new Date(date.getFullYear(), 0, 1))
          }
          showYearPicker
          dateFormat="yyyy"
          maxDate={new Date()}
          todayButton="Bugün"
          className={styles.customDatepicker}
        />
      </div>

      <div className={styles.chartWrapper}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
