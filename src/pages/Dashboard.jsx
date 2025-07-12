import React from "react";
import LogsPieChart from "../components/Chart/LogsPieChart/LogsPieChart.jsx";
import TotalLogsBar from "../components/Chart/TotalLogsBar/TotalLogsBar.jsx";

export default function Dashboard() {
  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#667eea" }}>Dashboard</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // burası önemli, saracak
          justifyContent: "center",
          alignItems: "stretch",
          gap: "20px",
        }}
      >
        <div style={{ flex: "1 1 300px", minWidth: 300 }}>
          <LogsPieChart />
        </div>
        <div style={{ flex: "1 1 300px", minWidth: 300 }}>
          <TotalLogsBar />
        </div>
      </div>
    </div>
  );
}
