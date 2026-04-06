import { useState } from 'react';
import Form from './components/Form';
import DiagnosisResults from './components/DiagnosisResults';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to fetch diagnosis.');
      }

      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout-container">
      <header className="app-header">
        <h1>Habit Drop-off Analyser</h1>
        <p>AI-powered diagnostic tool for PMs</p>
      </header>
      
      <main className="main-content">
        <section className="left-panel">
          <Form onAnalyze={handleAnalyze} isLoading={loading} />
        </section>
        
        <section className="right-panel">
          {error && (
            <div className="error-card">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}
          
          <DiagnosisResults results={results} isLoading={loading} />
        </section>
      </main>
    </div>
  );
}

export default App;
