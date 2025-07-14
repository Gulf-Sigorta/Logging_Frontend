import React from "react";

const LogTable = ({ logs }) => (
  <div className="shadow-md rounded-lg overflow-hidden">
    <div className="overflow-y-auto max-h-180">
      <table className="min-w-full table-auto bg-white border-separate">
        <thead className="bg-blue-600 text-white font-semibold sticky top-0">
          <tr>
            <th className="px-4 py-3 text-left rounded-tl-lg">Date</th>
            <th className="px-4 py-3 text-left">Level</th>
            <th className="px-4 py-3 text-left">Source</th>
            <th className="px-4 py-3 text-left">Thread</th>
            <th className="px-4 py-3 text-left rounded-tr-lg">Message</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {logs.map((log, i) => (
            <tr key={log.id} className="hover:bg-gray-100 transition-colors">
              {/* Eğer son satırsa alt köşeleri yuvarlamak istersen, ek sınıflar verilebilir */}
              <td className="px-4 py-3">{log.timestamp}</td>
              <td className={`px-4 py-3 ${levelColorClass(log.level)}`}>{log.level}</td>
              <td className="px-4 py-3">{log.source}</td>
              <td className="px-4 py-3">{log.thread}</td>
              <td className="px-4 py-3">{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);


function levelColorClass(level) {
  switch (level) {
    case "ERROR":
      return "text-red-600 font-semibold";
    case "WARNING":
      return "text-yellow-600 font-semibold";
    case "INFO":
      return "text-green-600 font-semibold";
    case "DEBUG":
      return "text-gray-600 font-semibold";
    default:
      return "";
  }
}

export default LogTable;
