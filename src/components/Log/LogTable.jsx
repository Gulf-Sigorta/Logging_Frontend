import React from "react";

const LogTable = ({ logs }) => (
  <div className="shadow-md rounded-lg overflow-hidden w-full">
    <div className="w-full">
      <div className="h-150 overflow-y-auto w-full">
        <table className="w-full table-auto bg-white border-separate text-sm">
          {" "}
          {/* BURADA w-full */}
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
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-100 transition-colors">
                <td className="px-3 py-2">{log.timestamp}</td>
                <td className={`px-3 py-2 ${levelColorClass(log.level)}`}>
                  {log.level}
                </td>
                <td className="px-3 py-2">{log.source}</td>
                <td className="px-3 py-2">{log.thread}</td>
                <td className="px-3 py-2 max-w-xs break-words">
                  {log.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

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
