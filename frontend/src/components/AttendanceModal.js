import React, { useState, useEffect, useCallback } from 'react';

const AttendanceModal = ({ emp, onClose }) => {

  const [status, setStatus] = useState('Present');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // ---------------- Fetch Attendance History ----------------
  const fetchHistory = useCallback(async () => {
    setFetching(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/attendance/${emp.id}`);

      if (!res.ok) {
        throw new Error("Could not fetch attendance records.");
      }

      const data = await res.json();
      setHistory(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setFetching(false);
    }

  }, [emp.id, API_URL]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // ---------------- Save Attendance ----------------
  const handleSave = async () => {

    if (!date) {
      setError("Please select a date.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employee_id: emp.id,
          date: date,
          status: status
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to mark attendance.");
        return;
      }

      // Refresh history after successful save
      fetchHistory();

    } catch (err) {
      setError("Server error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content card">

        <h3>Attendance: {emp.name}</h3>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <div className="form-group" style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />

          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <button
            onClick={handleSave}
            disabled={loading}
            className="btn-attendance"
          >
            {loading ? 'Saving...' : 'Mark Status'}
          </button>
        </div>

        <hr />

        <h4>Past Records</h4>

        {fetching ? (
          <p className="loading-state">Loading attendance records...</p>
        ) : history.length === 0 ? (
          <p className="empty-state">
            No attendance records found for this employee.
          </p>
        ) : (
          <ul
            className="attendance-history"
            style={{
              maxHeight: '200px',
              overflowY: 'auto',
              textAlign: 'left'
            }}
          >
            {history.map((record, index) => (
              <li
                key={index}
                style={{
                  padding: '6px 0',
                  borderBottom: '1px solid #eee'
                }}
              >
                <strong>{record.date}</strong> :
                <span
                  style={{
                    marginLeft: '6px',
                    color: record.status === 'Present' ? 'green' : 'red'
                  }}
                >
                  {record.status}
                </span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onClose}
          className="btn-secondary"
          style={{ marginTop: '20px' }}
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default AttendanceModal;
