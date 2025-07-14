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
import LogsPieChart from "../../components/Chart/LogsPieChart/LogsPieChart";
import logo from "../../assets/gig_logo.jpg";


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

  // Box shadow renkleri için class
  const shadowColors = {
    DEBUG: "shadow-[0_0_8px_2px_#20bf6b]",
    INFO: "shadow-[0_0_8px_2px_rgba(76,154,255,0.8)]",
    ERROR: "shadow-[0_0_8px_2px_rgba(255,76,76,0.8)]",
    WARN: "shadow-[0_0_8px_2px_rgba(255,165,0,0.8)]",
  };
  const bgColors = {
    DEBUG: "bg-green-100",
    INFO: "bg-blue-100",
    WARN: "bg-yellow-100",
    ERROR: "bg-red-100",
  };

  const textColors = {
    DEBUG: "text-green-700",
    INFO: "text-blue-700",
    WARN: "text-yellow-700",
    ERROR: "text-red-700",
  };


  return (
    <div
      className="relative min-h-screen bg-no-repeat bg-center bg-[length:40%_auto] pb-10"
      style={{ backgroundImage: "url('../../assets/gig_logo.jpg')" }}
    >
      <div
        className="flex justify-between items-center mx-[130px] my-10 gap-5 flex-wrap"
      >
        {/* Hoşgeldiniz */}
        <div className="flex-1 min-w-[180px]">
          <h2 className="m-0 text-[#1a237e] text-2xl font-semibold">Hoşgeldiniz!</h2>
          <p className="m-0 font-medium">GİG Sigorta Log Dashboard</p>
        </div>

        {/* Canlı Saat */}
        <div className="flex-1 min-w-[220px] flex flex-col items-center justify-center">
          <div
            className="text-5xl font-sans tracking-wider text-gray-900 bg-white bg-opacity-70 rounded-xl py-3 px-8 "
          >
            {clock.toLocaleTimeString("tr-TR")}
          </div>
          <span className="text-sm text-gray-600 mt-1.5">
            {clock.toLocaleDateString("tr-TR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Slogan */}
        <div className="flex-1 min-w-[180px] text-right">
          {/* Fotoğraf */}
          <img
            src={logo} // kendi yoluna göre değiştir
            alt="Slogan İkonu"
            className="inline-block mb-2 w-40 "
          />

          {/* Slogan yazısı */}
          <span className="italic text-[#1d185e] font-extralight text-xl block">
            "Aklımız Hep Sizde."
          </span>
        </div>



      </div>

      {/* Log Kartları */}
      <div className="flex justify-between mx-[130px] mt-2 gap-5 flex-wrap">
        {levels.map((level) => (
          <div
            key={level}
            className={`flex-1 rounded-xl p-3 text-center shadow-md flex flex-col justify-center min-w-[120px] transition-shadow duration-300 
              ${shadowColors[level]} ${bgColors[level]}`}
          >
            <h3 className={`m-0 text-lg ${textColors[level]}`}>{level}</h3>
            <p className={`m-0 text-2xl  ${textColors[level]}`}>
              {levelCounts[level] || 0}
            </p>
          </div>


        ))}
      </div>

      {/* Grafikler */}
      <div className="flex justify-around flex-wrap gap-10 mx-[130px] my-10">
        <div className="bg-gray-50 p-5 flex-1 flex justify-center rounded-xl shadow-md min-w-[300px] max-w-[600px]">
          <div className="w-full">
            <h3 className="mb-4 text-xl font-semibold">Log Seviyeleri</h3>
            <LogsPieChart />
          </div>
        </div>
      </div>



      {/* Saat bazlı log seviyesi grafiği */}
      <div className="flex justify-around flex-wrap gap-10 mx-[130px] my-10">
        <div className="bg-gray-50 p-5 flex-1 flex justify-center rounded-xl shadow-md min-w-[300px] max-w-[600px]">
          <div className="w-full">
            <h3 className="mb-4 text-xl font-semibold">Saat Bazlı Log Seviyesi Sayısı</h3>
            <BarChart
              width={600}
              height={300}
              data={barData}
              margin={{ top: 20, right: 40, left: 0, bottom: 5 }}
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

      {/* Arka plan logo için ::before efektini Tailwind ile yapmak zor, bunu CSS içinde bırakmak daha kolay */}
      <style jsx>{`
        div.relative::before {
          content: "";
          position: fixed;
          inset: 0;
          background: url('../../assets/gig_logo.jpg') no-repeat center center;
          background-size: 60% auto;
          opacity: 0.1;
          pointer-events: none;
          z-index: 0;
        }
      `}</style>
    </div>
  );
};

export default DashboardDeneme;
