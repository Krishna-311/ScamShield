import React, { useEffect, useState } from 'react';

// Import the new files
import Home from './home.jsx';
import Report from './report.jsx';
import Search from './search.jsx';
import Dashboard from './dashboard.jsx';
import Auth from './auth.jsx';

// In-memory data store to simulate a database
const initialScamReports = [];

// Chatbase Embed Script (Provided by the user)
const CHATBASE_EMBED_SCRIPT = `
(function(){
    if(!window.chatbase||window.chatbase("getState")!=="initialized"){
        window.chatbase=(...arguments)=>{
            if(!window.chatbase.q){window.chatbase.q=[]}
            window.chatbase.q.push(arguments)
        };
        window.chatbase=new Proxy(window.chatbase,{
            get(target,prop){
                if(prop==="q"){return target.q}
                return(...args)=>target(prop,...args)
            }
        })
    }
    const onLoad=function(){
        const script=document.createElement("script");
        script.src="https://www.chatbase.co/embed.min.js";
        script.id="k-r9TO-Ch-OoZWxVFnVgb";
        script.domain="www.chatbase.co";
        document.body.appendChild(script)
    };
    if(document.readyState==="complete"){
        onLoad()
    } else {
        window.addEventListener("load",onLoad)
    }
})();
`;

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [scamReports, setScamReports] = useState(initialScamReports);
  const [activeUsers, setActiveUsers] = useState(0);
  const userId = 'anonymous-user';
  const totalReports = scamReports.length;

  const navigate = (page) => {
    setCurrentPage(page);
  };

  // --- START CHATBASE INTEGRATION ---
  useEffect(() => {
    // 1. Calculate active users (existing logic)
    const uniqueUsers = new Set(scamReports.map(report => report.userId));
    setActiveUsers(uniqueUsers.size);

    // 2. Inject Chatbase Script
    try {
      // Create a temporary script element to execute the Chatbase JS string
      const scriptElement = document.createElement('script');
      scriptElement.innerHTML = CHATBASE_EMBED_SCRIPT;
      document.body.appendChild(scriptElement);

      // Clean up the script element when the component unmounts
      return () => {
        // Find and remove the script by its ID (if necessary, though usually fine to leave Chatbase)
        const chatbaseScript = document.getElementById('k-r9TO-Ch-OoZWxVFnVgb');
        if (chatbaseScript) {
          document.body.removeChild(chatbaseScript);
        }
        // NOTE: The main script (added via innerHTML) doesn't have an ID,
        // but the internal logic only runs once, which is what we want.
      };

    } catch (e) {
      console.error("Failed to inject Chatbase script:", e);
    }

  }, [scamReports]); // Dependency array: Runs on mount and when scamReports changes (for user count)
  // --- END CHATBASE INTEGRATION ---

  const pages = {
    home: <Home navigate={navigate} totalReports={totalReports} scamTypeCount={new Set(scamReports.map(r => r.scamType)).size} activeUsers={activeUsers} />,
    report: <Report setScamReports={setScamReports} userId={userId} />,
    search: <Search scamReports={scamReports} />,
    dashboard: <Dashboard scamReports={scamReports} />,
    auth: <Auth userId={userId} />,
  };

  const NavLink = ({ page, currentPage, onClick, children }) => (
    <button
      onClick={onClick}
      className={`nav-link ${currentPage === page ? 'active' : ''}`}
    >
      {children}
    </button>
  );

  // The FloatingChatbot component has been removed from this file.

  return (
    <>
      <style>
        {/* All CSS styles remain here, including the styles for the old floating-chatbot
            which you might want to remove later if you are cleaning up the CSS,
            but are left here for now to avoid breaking other styles. */}
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f3f4f6;
          margin: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .container {
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          padding: 1rem;
        }
        .main-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .header {
          background-color: #fff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .nav-link {
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          transition: background-color 0.3s, color 0.3s;
          cursor: pointer;
          border: none;
          background: none;
        }
        .nav-link.active {
          background-color: #4f46e5;
          color: #fff;
        }
        .nav-link:hover:not(.active) {
          background-color: #e5e7eb;
        }
        .page-section {
          padding: 2rem;
        }
        .card {
          background-color: #fff;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 2.5rem;
          text-align: center;
        }
        .card-title {
          font-size: 2.25rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 1rem;
        }
        .card-subtitle {
          font-size: 1.125rem;
          color: #4b5563;
          margin-bottom: 2rem;
          max-width: 42rem;
          margin-left: auto;
          margin-right: auto;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        @media (min-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .stats-card {
          background-color: #eff6ff;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        .stat-value {
          font-size: 2.25rem;
          font-weight: 700;
          color: #4f46e5;
        }
        .stat-label {
          color: #4b5563;
        }
        .button {
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          font-weight: 600;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .button-primary {
          background-color: #4f46e5;
          color: #fff;
        }
        .button-primary:hover {
          background-color: #4338ca;
        }
        .button-secondary {
          background-color: #e5e7eb;
          color: #1f2937;
        }
        .button-secondary:hover {
          background-color: #d1d5db;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-label {
          display: block;
          color: #374151;
          margin-bottom: 0.25rem;
        }
        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.25);
        }
        .footer {
          background-color: #1f2937;
          color: #fff;
          text-align: center;
          padding: 1rem;
          margin-top: auto;
        }
        .search-results-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .search-result-item {
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          margin-bottom: 1rem;
        }
        .risk-high { color: #ef4444; font-weight: 600; }
        .risk-moderate { color: #eab308; font-weight: 600; }
        .risk-low { color: #22c55e; font-weight: 600; }
        .charts-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 1024px) {
          .charts-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .chart-card {
          background-color: #fff;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          text-align: center;
        }
        /* Put this inside your <style> block after existing styles */

/* MOBILE ONLY STYLES */
@media (max-width: 768px) {
  nav.container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  nav.container > div:last-child {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
    width: 100%;
  }

  .nav-link {
    flex: 1 1 auto;
    text-align: center;
    font-size: 0.85rem;
    padding: 0.5rem;
  }

  .page-section {
    padding: 1rem;
  }

  .card {
    padding: 1.25rem;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .card-subtitle {
    font-size: 0.95rem;
  }

  .stats-grid {
    grid-template-columns: 1fr !important; /* force single column */
    gap: 1rem;
  }

  .stat-value {
    font-size: 1.25rem;
  }

  .stat-label {
    font-size: 0.8rem;
  }

  .button {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .charts-container {
    grid-template-columns: 1fr !important; /* charts stack vertically */
  }
}

        `}
      </style>
      <div className="main-container">
        <header className="header">
          <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4f46e5' }}>ScamShield</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <NavLink page="home" currentPage={currentPage} onClick={() => navigate('home')}>Home</NavLink>
              <NavLink page="report" currentPage={currentPage} onClick={() => navigate('report')}>Report</NavLink>
              <NavLink page="search" currentPage={currentPage} onClick={() => navigate('search')}>Search</NavLink>
              <NavLink page="dashboard" currentPage={currentPage} onClick={() => navigate('dashboard')}>Dashboard</NavLink>
              <NavLink page="auth" currentPage={currentPage} onClick={() => navigate('auth')}>Auth</NavLink>
            </div>
          </nav>
        </header>

        <main style={{ flexGrow: 1 }}>
          {pages[currentPage]}
        </main>

        <footer className="footer">
          <p style={{ fontSize: '0.875rem' }}>&copy; 2024 ScamShield. All Rights Reserved. User ID: {userId}</p>
        </footer>
      </div>
      {/* <FloatingChatbot /> removed */}
    </>
  );
}