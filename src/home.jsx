import React from 'react';

const Home = ({ navigate, totalReports, scamTypeCount, activeUsers }) => {
  return (
    <section className="page-section">
      <style>{`
        @media (max-width: 768px) {
          .container.card {
            padding: 1rem !important;
            margin: 1rem;
          }

          .card-title {
            font-size: 1.5rem !important;
            text-align: center;
          }

          .card-subtitle {
            font-size: 0.875rem !important;
            text-align: center;
          }

          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem;
          }

          .stat-value {
            font-size: 1.25rem !important;
          }

          .stat-label {
            font-size: 0.8rem !important;
          }

          .button {
            width: 100% !important;
            padding: 0.75rem !important;
          }

          div[style*="flex-direction: column"][style*="align-items: center"] {
            gap: 0.75rem !important;
          }
        }
      `}</style>

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

export default Home;
