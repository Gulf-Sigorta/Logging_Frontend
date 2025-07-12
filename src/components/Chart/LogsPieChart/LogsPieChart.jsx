import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import styles from "./LogsPieChart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

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
  "2025-07": [10, 7, 3, 2],
  "2025-06": [5, 12, 4, 1],
  "2025-05": [8, 6, 2, 3],
};

export default function LogsPieChart() {
  const today = new Date();
  const [date, setDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const key = `${year}-${month.toString().padStart(2, "0")}`;
  const dataValues = sampleData[key] || [0, 0, 0, 0];

  const data = {
    labels: ["DEBUG", "INFO", "WARNING", "ERROR"],
    datasets: [
      {
        label: "Log Seviyeleri",
        data: dataValues,
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#f44336"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Burayı ekledik
    plugins: {
      legend: { position: "bottom" },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        {year} {months[month - 1]} Log Seviyeleri
      </h3>

      <div className={styles.datepickerWrapper}>
        <DatePicker
          selected={date}
          onChange={(d) => {
            setDate(new Date(d.getFullYear(), d.getMonth(), 1));
          }}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          maxDate={new Date()}
          todayButton="Bugün"
          className={styles.customDatepicker}
        />
      </div>

      <div className={styles.chartWrapper}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
