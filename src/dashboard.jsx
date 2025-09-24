import React, { useEffect, useState } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Helper function moved to this file
function countScams(data, key = 'scamType') {
  const counts = {};
  data.forEach(item => {
    const type = item[key] || 'Unknown';
    counts[type] = (counts[type] || 0) + 1;
  });
  return Object.keys(counts).map(name => ({
    name,
    value: counts[name]
  }));
}

const Dashboard = ({ scamReports }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>Loading analytics...</div>;
  if (scamReports.length === 0) return <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>No data available to display charts.</div>;

  const entityData = countScams(scamReports, 'entityValue');
  const sourceData = countScams(scamReports, 'entityType');

  return (
    <section className="page-section">
      <div className="container card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Analytics Dashboard</h2>
        <div className="charts-container">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Reported Entities vs. Count</h3>
            <div style={{ height: '20rem', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={entityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Scam Source Breakdown</h3>
            <div style={{ height: '20rem', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#4f46e5"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;