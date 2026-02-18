import React from 'react';

const DailyTracker = ({ employees, dailyStatus }) => {
  const today = new Date().toISOString().split('T')[0];
  
  const presentCount = Object.values(dailyStatus).filter(s => s === 'Present').length;
  const total = employees.length;

  return (
    <div className="card tracker-card">
      <h3>Daily Overview ({today})</h3>
      <div className="tracker-stats">
        <div className="stat-item">
          <strong>Total:</strong> {total}
        </div>
        <div className="stat-item">
          <strong>Present:</strong> <span style={{color: 'green'}}>{presentCount}</span>
        </div>
        <div className="stat-item">
          <strong>Pending:</strong> {total - Object.keys(dailyStatus).length}
        </div>
      </div>
      {/* Requirement: Meaningful UI states (Loading/Progress) */}
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${(presentCount / total) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DailyTracker;