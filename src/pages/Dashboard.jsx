import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLogs,
  fetchLevelCounts,
  fetchTodayLevelCounts,
  fetchLevelCountsFromDate,
  fetchLogsToday,
} from "../store/logSlice";

import LoadingSpinner from "../components/LoadingSpinner";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import LogsPieChart from "../components/Chart/LogsPieChart/LogsPieChart";
import logo from "../assets/gig_logo.jpg";

const COLORS = {
  ERROR: "rgba(255, 76, 76, 0.8)",
  WARNING: "rgba(255, 165, 0, 0.8)",
  INFO: "rgba(76, 154, 255, 0.8)",
  DEBUG: "#20bf6b",
};

const DashboardDeneme = () => {
  const dispatch = useDispatch();

  const { logs, levelCounts } = useSelector((state) => state.logs);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const levelCountsToday = useSelector((state) => state.logs.levelCountsToday);
  const levelCountsFromDate = useSelector(
    (state) => state.logs.levelCountsFromDate
  );
  const logsToday = useSelector((state) => state.logs.logsToday);


  useEffect(() => {
    dispatch(fetchLogs({ page, size: pageSize, level: selectedLevel }));
  }, [page, pageSize, selectedLevel, dispatch]);

  useEffect(() => {
    dispatch(fetchLevelCounts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTodayLevelCounts());
  }, [dispatch]);

  const [selectedDate, setSelectedDate] = useState(new Date());


  useEffect(() => {
    dispatch(fetchLogsToday());
  }, [dispatch]);


  useEffect(() => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // 7 gün önce
    const isoDate = startDate.toISOString(); // "2025-07-08T14:30:00.000Z"

    dispatch(fetchLevelCountsFromDate(isoDate));
  }, [dispatch]);

  const levels = ["DEBUG", "INFO", "ERROR", "WARNING"];

  // Saat bazlı loglar
  const timeLevelCountsToday = {};
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, "0");
    timeLevelCountsToday[hour] = { DEBUG: 0, INFO: 0, ERROR: 0, WARNING: 0 };
  }
  logsToday.forEach(({ level, timestamp }) => {
    const hour = timestamp.slice(11, 13);
    if (timeLevelCountsToday[hour]) {
      timeLevelCountsToday[hour][level]++;
    }
  });
  const barDataToday = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return {
      hour: `${hour}:00`,
      ...timeLevelCountsToday[hour],
    };
  });


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
    WARNING: "shadow-[0_0_8px_2px_rgba(255,165,0,0.8)]",
  };
  const bgColors = {
    DEBUG: "bg-green-100",
    INFO: "bg-blue-100",
    WARNING: "bg-yellow-100",
    ERROR: "bg-red-100",
  };

  const textColors = {
    DEBUG: "text-green-700",
    INFO: "text-blue-700",
    WARNING: "text-yellow-700",
    ERROR: "text-red-700",
  };

  return (
    <div className="relative min-h-screen">
      {" "}
      <img
        src={logo}
        alt="Logo"
        className="fixed top-1/2 left-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 opacity-3 pointer-events-none select-none"
      />
      <div className="flex justify-between items-center mx-[130px] my-10 gap-5 flex-wrap">
        {/* Hoşgeldiniz */}
        <div className="flex-1 min-w-[180px]">
          <h2 className="m-0 text-[#1a237e] text-2xl font-semibold">
            Hoşgeldiniz!
          </h2>
          <p className="m-0 font-medium">GİG Sigorta Log Dashboard</p>
        </div>

        {/* Canlı Saat */}
        <div className="flex-1 min-w-[220px] flex flex-col items-center justify-center">
          <div className="text-5xl font-sans tracking-wider text-gray-900 bg-white bg-opacity-70 rounded-xl py-3 px-8 ">
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
      <div className="flex justify-center gap-10 mx-[130px] my-10 flex-wrap">
        {/* Log Kartları */}
        <div className="flex flex-col justify-between gap-5">
          {levels.map((level) => (
            <div
              key={level}
              className={`rounded-xl p-3 text-center shadow-md flex flex-col justify-center min-w-[120px] transition-shadow duration-300 
          ${shadowColors[level]} ${bgColors[level]}`}
            >
              <h3 className={`m-0 text-lg ${textColors[level]}`}>{level}</h3>
              <p className={`m-0 text-2xl  ${textColors[level]}`}>
                {levelCountsToday[level] || 0}
              </p>
            </div>
          ))}
        </div>

        {/* Grafik */}
        <div className="bg-gray-50 p-5 flex-1 flex justify-center rounded-xl shadow-md min-w-[300px] max-w-[600px]">
          <div className="w-full">
            <h3 className="mb-4 text-xl font-semibold">Log Seviyeleri</h3>
            <LogsPieChart
              levelCountsFromDate={levelCountsFromDate}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />          
            </div>
        </div>
      </div>
      {/* Saat bazlı log seviyesi grafiği */}
      <div className="flex justify-around flex-wrap gap-10 mx my-10">
        <div className="bg-gray-50 p-5 flex-1 flex justify-center rounded-xl shadow-md min-w-[300px] max-w-[760px]">
          <div className="w-full">
            <h3 className="mb-4 text-xl font-semibold">
              Saat Bazlı Log Seviyesi Sayısı
            </h3>
            <BarChart
              width={600}
              height={300}
              data={barDataToday}
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
    </div>
  );
};

export default DashboardDeneme;
