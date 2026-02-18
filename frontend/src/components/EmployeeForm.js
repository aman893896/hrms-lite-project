import React, { useState } from 'react';

const EmployeeForm = ({ onRefresh }) => {
  const [form, setForm] = useState({
    emp_id: '',
    name: '',
    email: '',
    department: ''
  });

  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Trim values to prevent whitespace-only input
    const trimmedForm = {
      emp_id: form.emp_id.trim(),
      name: form.name.trim(),
      email: form.email.trim(),
      department: form.department.trim()
    };

    // Client-side required validation
    if (!trimmedForm.emp_id || !trimmedForm.name || !trimmedForm.email || !trimmedForm.department) {
      setError("All fields are required.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(`${API_URL}/api/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmedForm)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to register employee.");
        return;
      }

      // Success
      setForm({ emp_id: '', name: '', email: '', department: '' });
      onRefresh();

    } catch (error) {
      console.error("Connection Error:", error);
      setError("Could not connect to the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2>Register Employee</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Employee ID"
          value={form.emp_id}
          onChange={e => setForm({ ...form, emp_id: e.target.value })}
          required
        />

        <input
          placeholder="Full Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Email Address"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          placeholder="Department"
          value={form.department}
          onChange={e => setForm({ ...form, department: e.target.value })}
          required
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
