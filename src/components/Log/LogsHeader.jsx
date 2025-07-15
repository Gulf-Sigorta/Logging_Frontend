import React from "react";
import LogLevelSummary from "./LogLevelSummary";
import { exportToExcel } from "../../utils/excelExporter";
import excelIcon from "../../assets/excel.png";

const LogsHeader = ({
  selectedLevel,
  onLevelSelect,
  pageSize,
  setPageSize,
  levelCounts,
  logs,
}) => {
  return (
    <div className="w-full flex flex-col lg:flex-row lg:flex-wrap justify-between mb-5">
      <div className="w-full lg:w-full mb-4 ">
        <LogLevelSummary
          levelCounts={levelCounts}
          selectedLevel={selectedLevel}
          onLevelSelect={onLevelSelect}
        />
      </div>

      <div className="flex items-center gap-4 w-full  ">
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="px-3 py-2 rounded border border-gray-300 font-medium w-full lg:w-full"
        >
          {[15, 30, 50, 75, 100].map((size) => (
            <option key={size} value={size}>
              {size} log göster
            </option>
          ))}
        </select>

        <button
          onClick={() => exportToExcel(logs, selectedLevel)}
          className="flex items-center justify-center gap-2 px-6 py-2 bg-green-700 hover:bg-green-800 text-white font-semibold rounded shadow-md transition-colors duration-300 cursor-pointer w-auto"
        >
          <img src={excelIcon} alt="Excel Icon" className="w-5 h-5" />
          <span className="whitespace-nowrap">Logları indir</span>
        </button>
      </div>
    </div>
  );
};

export default LogsHeader;
