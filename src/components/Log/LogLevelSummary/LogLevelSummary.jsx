import React from "react";

const LogLevelSummary = ({ levelCounts, selectedLevel, onLevelSelect }) => {
  const levels = ["HEPSİ", "ERROR", "WARNING", "INFO", "DEBUG"];
const levelStyleMap = {
  ERROR: "border border-red-500 text-red-700 bg-red-100/30 hover:bg-red-100/60",
  WARNING: "border border-yellow-500 text-yellow-700 bg-yellow-100/30 hover:bg-yellow-100/60",
  INFO: "border border-blue-500 text-blue-700 bg-blue-100/30 hover:bg-blue-100/60",
  DEBUG: "border border-green-500 text-green-700 bg-green-100/30 hover:bg-green-100/60",
  HEPSİ: "border border-gray-400 text-gray-700 bg-gray-100/30 hover:bg-gray-100/60",
};


  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 w-full">
      {levels.map((level) => {
        const isSelected =
          selectedLevel === level ||
          (level === "HEPSİ" && selectedLevel === "");

        return (
          <button
            key={level}
            onClick={() => onLevelSelect(level === "HEPSİ" ? "" : level)}
            className={`
              flex-1 sm:flex-none min-w-[100px] text-center px-4 py-2 rounded-lg shadow
              transition-transform duration-200 cursor-pointer hover:scale-105
              ${levelStyleMap[level]}
              ${isSelected ? "outline-2 outline-gray-800 scale-110" : ""}
            `}
          >
            <strong className="block">{level}</strong>
            {level !== "HEPSİ" && (
              <div className="text-sm">{levelCounts[level] ?? 0}</div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default LogLevelSummary;
