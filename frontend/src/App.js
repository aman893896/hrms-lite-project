import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import DailyTracker from './components/dailyStatus';

function App() {

  const [employees, setEmployees] = useState([]);
  const [dailyStatus, setDailyStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // ---------------- Fetch Employees ----------------
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset previous errors
    try {
      const res = await fetch(`${API_URL}/api/employees`);
      if (!res.ok) throw new Error("Failed to fetch employees.");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // ---------------- Fetch Today's Attendance ----------------
  const fetchDailyAttendance = useCallback(async () => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const res = await fetch(`${API_URL}/api/attendance/daily/${today}`);
      if (res.ok) {
        const data = await res.json();
        setDailyStatus(data);
      }
    } catch (err) {
      console.error("Tracker fetch failed", err);
    }
  }, [API_URL]);

  // ---------------- Initial Load ----------------
  useEffect(() => {
    fetchData();
    fetchDailyAttendance();
  }, [fetchData, fetchDailyAttendance]);

  // ---------------- 5 Minute Auto Refresh ----------------
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Auto refreshing HRMS data...");
      fetchData();
      fetchDailyAttendance();
    }, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(interval); // Cleanup
  }, [fetchData, fetchDailyAttendance]);

  // ---------------- Manual Refresh Handler ----------------
  const handleRefresh = () => {
    fetchData();
    fetchDailyAttendance();
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">

        <DailyTracker
          employees={employees}
          dailyStatus={dailyStatus}
        />

        <div className="main-layout">
          <EmployeeForm onRefresh={handleRefresh} />

          {loading ? (
            <div className="loading-state">Loading HRMS Data...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : employees.length === 0 ? (
            <div className="empty-state">No employees found.</div>
          ) : (
            <EmployeeList
              employees={employees}
              onRefresh={handleRefresh}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
