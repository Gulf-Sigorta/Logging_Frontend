import React from "react";
import styles from "./LogLevelSummary.module.css";

const LogLevelSummary = ({ levelCounts, selectedLevel, onLevelSelect }) => {
  const levels = ["HEPSİ", "ERROR", "WARNING", "INFO", "DEBUG"];

  const levelClassMap = {
    ERROR: styles.error,
    WARNING: styles.warning,
    INFO: styles.info,
    DEBUG: styles.debug,
    HEPSİ: styles.all,
  };

  return (
    <div className={styles.container}>
      {levels.map((level) => {
        const isSelected =
          selectedLevel === level ||
          (level === "HEPSİ" && selectedLevel === "");
        return (
          <button
            key={level}
            className={`${styles.box} ${levelClassMap[level]} ${
              isSelected ? styles.selected : ""
            }`}
            onClick={() => onLevelSelect(level === "HEPSİ" ? "" : level)}
          >
            <strong>{level}</strong>
            {level !== "HEPSİ" && <div>{levelCounts[level] ?? 0}</div>}
          </button>
        );
      })}
    </div>
  );
};

export default LogLevelSummary;
