import React, { useState } from 'react';

// Simple ID generator
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

const Report = ({ setScamReports, userId }) => {
  const [formData, setFormData] = useState({
    entityType: 'Phone/SMS',
    entityValue: '',
    description: '',
    screenshot: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newReport = {
        id: generateId(),
        scamType: 'UPI Fraud',
        ...formData,
        userId: userId,
        timestamp: new Date(),
        riskLevel: 'Low',
        reportsCount: 1,
        verified: false,
      };
      setScamReports(prev => [...prev, newReport]);
      setMessage('Scam report submitted successfully!');
      setMessageType('success');
      setFormData({
        entityType: 'Phone/SMS',
        entityValue: '',
        description: '',
        screenshot: '',
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      setMessage('Failed to submit report. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <section className="page-section">
      <style>{`
        @media (max-width: 768px) {
          .container.card {
            padding: 1rem !important;
            margin: 1rem;
          }

          .page-section h2 {
            font-size: 1.25rem !important;
            text-align: center;
          }

          .form-label {
            font-size: 0.875rem !important;
          }

          .form-input, .form-select, .form-textarea {
            font-size: 0.875rem !important;
          }

          button.button-primary {
            width: 100% !important;
            padding: 0.75rem !important;
          }

          div[style*="marginTop: '1rem'"][style*="textAlign: 'center'"] {
            font-size: 0.85rem !important;
            padding: 0.5rem !important;
          }
        }
      `}</style>

      <div className="container card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Report a UPI Fraud</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Scam Type</label>
            <input
              type="text"
              name="scamType"
              value="UPI Fraud"
              disabled
              className="form-input"
              style={{ backgroundColor: '#e5e7eb' }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Entity to Report</label>
            <select
              name="entityType"
              value={formData.entityType}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="Phone/SMS">Phone/SMS</option>
              <option value="Email">Email</option>
              <option value="Website">Website</option>
              <option value="Social Media">Social Media</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">{formData.entityType} Value</label>
            <input
              type="text"
              name="entityValue"
              value={formData.entityValue}
              onChange={handleChange}
              placeholder={`e.g., ${formData.entityType === 'Phone/SMS' ? '+1234567890' : formData.entityType === 'Email' ? 'scammer@email.com' : 'scammer-site.com'}`}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Message Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="form-textarea"
            ></textarea>
          </div>
          <div className="form-group">
            <label className="form-label">Attach Screenshots (Optional)</label>
            <input
              type="file"
              name="screenshot"
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <button
            type="submit"
            className="button button-primary"
            style={{ width: '100%' }}
          >
            Submit Report
          </button>
        </form>
        {message && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '0.375rem', textAlign: 'center', backgroundColor: messageType === 'success' ? '#d1fae5' : '#fee2e2', color: messageType === 'success' ? '#065f46' : '#991b1b' }}>
            {message}
          </div>
        )}
      </div>
    </section>
  );
};

export default Report;
