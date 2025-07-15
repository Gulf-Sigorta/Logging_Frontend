// src/store/logSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLogs = createAsyncThunk(
  "logs/fetchLogs",
  async ({ page, size, level }, thunkAPI) => {
    try {
      const baseUrl = level
        ? `http://localhost:8080/api/log/get-log-by-level/${level}`
        : `http://localhost:8080/api/log`;

      const url = `${baseUrl}?page=${page}&size=${size}`;
      const response = await axios.get(url, { withCredentials: true });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Loglar alınamadı");
    }
  }
);

export const fetchLevelCounts = createAsyncThunk(
  "logs/fetchLevelCounts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/log/level-counts",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Seviye sayıları alınamadı");
    }
  }
);

export const fetchTodayLevelCounts = createAsyncThunk(
  "logs/fetchTodayLevelCounts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/log/level-counts-today",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Bugünün seviye sayıları alınamadı");
    }
  }
);

export const fetchLevelCountsFromDate = createAsyncThunk(
  "logs/fetchLevelCountsFromDate",
  async (startDate, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/log/level-counts-from-date?startDate=${encodeURIComponent(
          startDate
        )}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Log seviyeleri alınamadı");
    }
  }
);

const logSlice = createSlice({
  name: "logs",
  initialState: {
    logs: [],
    totalPages: 0,
    levelCounts: {},
    levelCountsToday: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.logs = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLevelCounts.fulfilled, (state, action) => {
        const counts = {};
        action.payload.forEach((item) => {
          counts[item.level] = item.count;
        });
        state.levelCounts = counts;
      })
      .addCase(fetchTodayLevelCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodayLevelCounts.fulfilled, (state, action) => {
        const counts = {};
        action.payload.forEach((item) => {
          counts[item.level] = item.count;
        });
        state.levelCountsToday = counts;
        state.loading = false;
      })
      .addCase(fetchTodayLevelCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLevelCountsFromDate.fulfilled, (state, action) => {
        const counts = {};
        action.payload.forEach((item) => {
          counts[item.level] = item.count;
        });
        state.levelCountsFromDate = counts;
      })
      .addCase(fetchLevelCountsFromDate.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default logSlice.reducer;
