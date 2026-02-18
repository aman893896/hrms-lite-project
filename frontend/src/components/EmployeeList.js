import React, { useState } from 'react';
import AttendanceModal from './AttendanceModal';

const EmployeeList = ({ employees, onRefresh }) => {

  const [selectedEmp, setSelectedEmp] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleDelete = async (id) => {
    setError(null);

    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      setDeletingId(id);

      const res = await fetch(`${API_URL}/api/employees/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error("Failed to delete employee.");
      }

      onRefresh();

    } catch (err) {
      console.error(err);
      setError("Unable to delete employee. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="card">
      <h2>Employee Records</h2>

      {error && <div className="error-message">{error}</div>}

      {employees.length === 0 ? (
        <p className="empty-state">No employees registered yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.emp_id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>

                  <button
                    onClick={() => setSelectedEmp(emp)}
                    className="btn-attendance"
                  >
                    Attendance
                  </button>

                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="btn-delete"
                    disabled={deletingId === emp.id}
                  >
                    {deletingId === emp.id ? "Deleting..." : "Delete"}
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedEmp && (
        <AttendanceModal
          emp={selectedEmp}
          onClose={() => setSelectedEmp(null)}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
};

export default EmployeeList;
