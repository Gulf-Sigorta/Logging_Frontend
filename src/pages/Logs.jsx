import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs, fetchLevelCounts } from "../store/logSlice";
import LogTable from "../components/Log/LogTable";
import Pagination from "../components/Pagination";
import LogsHeader from "../components/Log/LogsHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import logo from "../assets/gig_logo.jpg";

const Logs = () => {
  const dispatch = useDispatch();
  const [selectedLevel, setSelectedLevel] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);

  const { logs, totalPages, levelCounts, loading } = useSelector(
    (state) => state.logs
  );

  useEffect(() => {
    dispatch(fetchLogs({ page, size: pageSize, level: selectedLevel }));
  }, [page, pageSize, selectedLevel, dispatch]);

  useEffect(() => {
    dispatch(fetchLevelCounts());
  }, [dispatch]);



  return (
    <div className="p-5 mt-10 relative">
      <img
        src={logo}
        alt="Logo"
        className="fixed top-1/2 left-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 opacity-3 pointer-events-none select-none"
      />
      <LogsHeader
        selectedLevel={selectedLevel}
        onLevelSelect={(level) => {
          setSelectedLevel(level);
          setPage(0);
        }}
        pageSize={pageSize}
        setPageSize={(size) => {
          setPageSize(size);
          setPage(0);
        }}
        levelCounts={levelCounts}
        logs={logs}
      />


      <LogTable logs={logs} isLoading={loading} />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Logs;
