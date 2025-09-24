import React from 'react';

const home = ({ navigate, totalReports, scamTypeCount, activeUsers }) => {
  return (
    <section className="page-section">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="card">
          <h1 className="card-title">Crowdsourced Scam Intelligence Platform</h1>
          <p className="card-subtitle">
            Empowering you to fight back against scams using the collective power of community-driven data and AI.
          </p>
          <div className="stats-grid">
            <div className="stats-card">
              <p className="stat-value">{totalReports}</p>
              <p className="stat-label">Total Reports</p>
            </div>
            <div className="stats-card">
              <p className="stat-value">{scamTypeCount}</p>
              <p className="stat-label">Scam Type Detected</p>
            </div>
            <div className="stats-card">
              <p className="stat-value">{activeUsers}</p>
              <p className="stat-label">Active Users</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => navigate('report')}
              className="button button-primary"
            >
              Report a Scam
            </button>
            <button
              onClick={() => navigate('search')}
              className="button button-secondary"
            >
              Lookup a Scam
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default home;