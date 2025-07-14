import React from "react";

const LogLevelSummary = ({ levelCounts, selectedLevel, onLevelSelect }) => {
  const levels = ["HEPSİ", "ERROR", "WARNING", "INFO", "DEBUG"];
  const levelStyleMap = {
    ERROR: "bg-red-500 text-white",
    WARNING: "bg-yellow-400 text-white",
    INFO: "bg-blue-500 text-white",
    DEBUG: "bg-green-500 text-white",
    HEPSİ: "bg-gray-500 text-white",
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
