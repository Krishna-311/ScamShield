import React, { useState } from 'react';

const Search = ({ scamReports }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setSearchError('');
    setResults([]);

    setTimeout(() => {
      try {
        const data = scamReports.filter(report => report.entityValue.toLowerCase().includes(searchTerm.toLowerCase()));

        const aggregatedData = data.reduce((acc, report) => {
          if (!acc[report.entityValue]) {
            acc[report.entityValue] = {
              reportsCount: 0,
              scamTypes: new Set(),
              firstReport: report.timestamp,
              entityType: report.entityType,
              entityValue: report.entityValue,
            };
          }
          acc[report.entityValue].reportsCount++;
          acc[report.entityValue].scamTypes.add(report.scamType);
          return acc;
        }, {});

        const processedResults = Object.values(aggregatedData).map(item => ({
          ...item,
          scamTypes: Array.from(item.scamTypes).join(', '),
          riskLevel: item.reportsCount > 5 ? 'High' : (item.reportsCount > 1 ? 'Moderate' : 'Low'),
        }));
        
        setResults(processedResults);
      } catch (e) {
        console.error("Error fetching documents: ", e);
        setSearchError('Failed to perform search. Please check your input.');
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const getRiskColorClass = (level) => {
    switch (level) {
      case 'High': return 'risk-high';
      case 'Moderate': return 'risk-moderate';
      case 'Low': return 'risk-low';
      default: return '';
    }
  };

  return (
    <section className="page-section">
      <div className="container card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Search & Lookup</h2>
        <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Phone, Email, or Website"
              className="form-input"
              required
            />
            <button
              type="submit"
              className="button button-primary"
            >
              Search
            </button>
          </div>
        </form>
        
        {loading && <div style={{ textAlign: 'center', color: '#4b5563' }}>Searching...</div>}
        {searchError && <div style={{ textAlign: 'center', color: '#ef4444' }}>{searchError}</div>}
        
        {results.length > 0 ? (
          <ul className="search-results-list">
            {results.map((result, index) => (
              <li key={index} className="search-result-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <span className={getRiskColorClass(result.riskLevel)}>Risk: {result.riskLevel}</span>
                  <span style={{ color: '#6b7280' }}>|</span>
                  <span style={{ color: '#4b5563', fontWeight: '500' }}>{result.reportsCount} reports</span>
                </div>
                <p style={{ color: '#1f2937', wordBreak: 'break-word' }}><span style={{ fontWeight: '600' }}>Entity:</span> {result.entityValue}</p>
                <p style={{ color: '#1f2937' }}><span style={{ fontWeight: '600' }}>Type:</span> {result.scamTypes}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <span style={{ color: '#10b981', fontWeight: '600' }}>✅ Verified Scam</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !loading && !searchError && searchTerm && (
            <div style={{ textAlign: 'center', color: '#4b5563' }}>No scams found for "{searchTerm}".</div>
          )
        )}
      </div>
    </section>
  );
};

export default Search;