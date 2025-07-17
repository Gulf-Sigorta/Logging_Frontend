import React from "react";
import LoadingSpinner from "../../components/LoadingSpinner";


const groupLogsByThread = (logs) => {
  const grouped = {};

  logs.forEach((log) => {
    if (!grouped[log.thread]) {
      grouped[log.thread] = [];
    }
    grouped[log.thread].push(log);
  });

  // Grupları sırala: thread içindekiler zaman sıralı
  Object.keys(grouped).forEach((thread) => {
    grouped[thread].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  });

  return grouped;
};

const LogTable = ({ logs, isLoading }) => {
  const groupedLogs = groupLogsByThread(logs);

  return (
    <div className="shadow-md rounded-lg overflow-hidden w-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-full">
          <div className="h-150 overflow-y-auto w-full">
            <table className="w-full table-auto bg-white border-separate text-sm">
              <thead className="bg-blue-900 text-white font-semibold sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left rounded-tl-lg">Date</th>
                  <th className="px-3 py-2 text-left">Level</th>
                  <th className="px-3 py-2 text-left">Source</th>
                  <th className="px-3 py-2 text-left">Thread</th>
                  <th className="px-3 py-2 text-left rounded-tr-lg">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {Object.entries(groupedLogs).map(([thread, logs]) => (
                  <React.Fragment key={thread}>
                    {/* Grup başlığı */}
                    <tr className="bg-gray-100">
                      <td colSpan="5" className="px-3 py-2 font-bold text-gray-800">
                        Thread: {thread}
                      </td>
                    </tr>
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-3 py-2">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className={`px-3 py-2 ${levelColorClass(log.level)}`}>
                          {log.level}
                        </td>
                        <td className="px-3 py-2">{log.source}</td>
                        <td className="px-3 py-2">{log.thread}</td>
                        <td className="px-3 py-2 max-w-xs break-words">{log.message}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};


function levelColorClass(level) {
  switch (level) {
    case "ERROR":
      return "text-red-700 font-semibold";
    case "WARNING":
      return "text-yellow-700 font-semibold";
    case "INFO":
      return "text-blue-700 font-semibold";
    case "DEBUG":
      return "text-green-700 font-semibold";
    case "HEPSİ":
      return "text-gray-700 font-semibold";
    default:
      return "";
  }
}

export default LogTable;
