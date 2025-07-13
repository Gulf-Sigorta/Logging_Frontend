import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import LogTable from "../components/Log/LogTable/LogTable";
import LogFilter from "../components/Log/LogFilter/LogFilter";
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
    <div style={{ padding: "20px 20px" }}>
      {/* Seçilebilir seviyeler */}
      <div style={{ display: "flex", alignItems: "center" }}>
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
          style={{
            marginLeft: "20px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontWeight: "500",
          }}
        >
          {[15, 30, 50, 75, 100].map((size) => (
            <option key={size} value={size}>
              {size} log göster
            </option>
          ))}
        </select>

        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={exportToExcel}
            style={{
              padding: "10px 20px",
              backgroundColor: "#217346",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1b5e2c")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#217346")}
          >
            <img
              src={excelIcon}
              alt="Excel Icon"
              style={{ width: 20, height: 20 }}
            />
            Excel olarak indir
          </button>
        </div>
      </div>

      <div style={{}}>
        <LogTable logs={logs} />
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Logs;
