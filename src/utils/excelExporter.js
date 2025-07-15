import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (logs, selectedLevel) => {
  const worksheetData = logs.map((log) => ({
    ID: log.id,
    Level: log.level,
    Source: log.source,
    Thread: log.thread,
    Message: log.message,
    Timestamp: log.timestamp,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Logs");

  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });

  const levelPart = selectedLevel ? selectedLevel.toUpperCase() : "ALL";
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10);
  const fileName = `logs_${levelPart}_${datePart}.xlsx`;

  saveAs(blob, fileName);
};
