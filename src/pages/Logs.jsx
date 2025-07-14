import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import LogTable from "../components/Log/LogTable/LogTable";
import Pagination from "../components/Pagination/Pagination";
import LogLevelSummary from "../components/Log/LogLevelSummary/LogLevelSummary";
import excelIcon from "../assets/excel.png";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [levelCounts, setLevelCounts] = useState({});
  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const baseUrl = selectedLevel
          ? `http://localhost:8080/api/log/get-log-by-level/${selectedLevel}`
          : `http://localhost:8080/api/log`;

        const url = `${baseUrl}?page=${page}&size=${pageSize}`;
        const response = await axios.get(url);

        setLogs(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error("Loglar alınamadı:", err);
      }
    };
    fetchLogs();
  }, [selectedLevel, page]);

  useEffect(() => {
    const fetchLevelCounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/log/level-counts"
        );
        setLevelCounts(response.data);
      } catch (err) {
        console.error("Log seviyeleri alınamadı:", err);
      }
    };
    fetchLevelCounts();
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const baseUrl = selectedLevel
          ? `http://localhost:8080/api/log/get-log-by-level/${selectedLevel}`
          : `http://localhost:8080/api/log`;

        const url = `${baseUrl}?page=${page}&size=${pageSize}`;
        const response = await axios.get(url);

        setLogs(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error("Loglar alınamadı:", err);
      }
    };
    fetchLogs();
  }, [selectedLevel, page, pageSize]); // ✅ pageSize eklendi

  const getExcelFileName = () => {
    const levelPart = selectedLevel ? selectedLevel.toUpperCase() : "ALL";

    const now = new Date();
    const datePart = now.toISOString().slice(0, 10); // "YYYY-MM-DD" formatı

    return `logs_${levelPart}_${datePart}.xlsx`;
  };

  const exportToExcel = () => {
    // logs dizisini Excel formatına uygun hale getir
    // Burada log objesindeki istediğin alanları seçebilirsin
    const worksheetData = logs.map((log) => ({
      ID: log.id,
      Level: log.level,
      Source: log.source,
      Thread: log.thread,
      Message: log.message,
      Timestamp: log.timestamp,
      // ihtiyacına göre diğer alanlar
    }));

    const fileName = getExcelFileName();

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Logs");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });

    saveAs(blob, fileName);
  };

  return (
    <div className="p-5">

      {/* Seçilebilir seviyeler */}
      <div className="flex flex-col items-end gap-4 mb-4 lg:flex-row lg:items-end lg:gap-6">
        <LogLevelSummary
          levelCounts={levelCounts}
          selectedLevel={selectedLevel}
          onLevelSelect={(level) => {
            setSelectedLevel(level);
            setPage(0);
          }}
        />

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(0); // Sayfa sıfırlansın
            }}
            className="px-3 py-2 rounded border border-gray-300 font-medium w-full sm:w-auto"
          >
            {[15, 30, 50, 75, 100].map((size) => (
              <option key={size} value={size}>
                {size} log göster
              </option>
            ))}
          </select>

          <button
            onClick={exportToExcel}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded shadow-md transition-colors duration-300 cursor-pointer w-full sm:w-auto"
          >
            <img src={excelIcon} alt="Excel Icon" className="w-5 h-5" />
            Logları indir
          </button>
      </div>




        <LogTable logs={logs} />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Logs;
