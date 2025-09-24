import React from 'react';

const auth = ({ userId }) => (
  <section className="page-section">
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

export default auth;