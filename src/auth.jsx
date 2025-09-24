import React from 'react';

const Auth = ({ userId }) => (
  <section className="page-section">
    <style>{`
      @media (max-width: 768px) {
        .page-section .card {
          max-width: 100% !important;
          margin: 1rem;
          padding: 1rem;
        }

        .page-section h2 {
          font-size: 1.25rem !important;
          text-align: center;
        }

        .page-section p {
          font-size: 0.875rem !important;
          line-height: 1.25rem;
          text-align: center;
        }

        .page-section div[style*="monospace"] {
          font-size: 0.8rem !important;
          padding: 0.75rem !important;
          overflow-wrap: break-word;
        }
      }
    `}</style>

    <div className="container card" style={{ maxWidth: '40rem', marginLeft: 'auto', marginRight: 'auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Login / Register</h2>
      <p style={{ color: '#4b5563', marginBottom: '1rem' }}>
        This page would handle user authentication. For this demo, a user is statically assigned an ID.
      </p>
      <div style={{ padding: '1rem', backgroundColor: '#e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#374151', fontFamily: 'monospace', wordBreak: 'break-all' }}>
        Current User ID: {userId}
      </div>
      <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
        In a real application, you would add secure forms here for username/password or social login.
      </p>
    </div>
  </section>
);

export default Auth;
