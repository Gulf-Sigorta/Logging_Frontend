import React, { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import styles from "./LogsPieChart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const months = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

export default function LogsPieChart({ levelCountsFromDate, selectedDate, setSelectedDate }) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;

  const defaultCounts = { DEBUG: 0, INFO: 0, WARNING: 0, ERROR: 0 };

  const countsMap = levelCountsFromDate || defaultCounts;

  const dataValues = [countsMap.DEBUG, countsMap.INFO, countsMap.WARNING, countsMap.ERROR];




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
    maintainAspectRatio: false,
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
          selected={selectedDate} 
          onChange={(d) => setSelectedDate(new Date(d.getFullYear(), d.getMonth(), 1))}
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
