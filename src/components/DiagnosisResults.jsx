import { AlertTriangle, CheckCircle2, Info, ArrowUpRight, Zap } from 'lucide-react';

const SeverityBadge = ({ severity }) => {
  const colors = {
    Critical: 'badge-critical',
    High: 'badge-high',
    Medium: 'badge-medium',
    Low: 'badge-low'
  };
  return (
    <span className={`severity-badge ${colors[severity] || 'badge-low'}`}>
      {severity}
    </span>
  );
};

const Gauge = ({ value, label }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  
  return (
    <div className="gauge-container">
      <svg className="gauge-svg" width="60" height="60">
        <circle className="gauge-bg" cx="30" cy="30" r={radius} strokeWidth="6" />
        <circle 
          className="gauge-progress" 
          cx="30" cy="30" r={radius} 
          strokeWidth="6" 
          strokeDasharray={circumference} 
          strokeDashoffset={offset} 
          transform="rotate(-90 30 30)"
        />
      </svg>
      <div className="gauge-value">{value}%</div>
      <div className="gauge-label">{label}</div>
    </div>
  );
};

export default function DiagnosisResults({ results, isLoading }) {
  if (isLoading) {
    return (
      <div className="skeleton-loader">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-card"></div>
        <div className="skeleton-gauges">
          <div className="skeleton skeleton-gauge"></div>
          <div className="skeleton skeleton-gauge"></div>
          <div className="skeleton skeleton-gauge"></div>
        </div>
        <div className="skeleton skeleton-card" style={{ height: '120px' }}></div>
        <div className="skeleton skeleton-card" style={{ height: '120px' }}></div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="empty-state">
        <Zap size={48} className="empty-icon" />
        <h3>Awaiting Data</h3>
        <p>Enter the habit details on the left to generate an AI-powered PM diagnosis.</p>
      </div>
    );
  }

  const { diagnosis, confidence, experiments } = results;

  return (
    <div className="results-container">
      {/* Diagnosis Card */}
      <div className="diagnosis-card glow-effect">
        <div className="card-header">
          <h2>Diagnosis</h2>
          <SeverityBadge severity={diagnosis?.severity} />
        </div>
        <div className="diagnosis-content">
          <h3 className="bottleneck-title">
            <AlertTriangle size={18} className="text-warning" /> 
            Bottleneck: {diagnosis?.bottleneckStageName}
          </h3>
          <p className="explanation">{diagnosis?.explanation}</p>
        </div>
      </div>

      {/* Confidence Scores */}
      <div className="confidence-section">
        <h3>AI Confidence</h3>
        <div className="gauges-row">
          <Gauge value={confidence?.diagnosis} label="Diagnosis" />
          <Gauge value={confidence?.impact} label="Fix Impact" />
          <Gauge value={confidence?.quality} label="Exp. Quality" />
        </div>
      </div>

      {/* Experiments */}
      <div className="experiments-section">
        <h3>Recommended Experiments</h3>
        <div className="experiments-list">
          {experiments?.map((exp, idx) => (
            <div key={idx} className="experiment-card">
              <div className="exp-header">
                <span className="exp-number">{idx + 1}</span>
                <h4>{exp.title}</h4>
                <span className={`complexity-badge ${exp.complexity.toLowerCase()}`}>
                  {exp.complexity} Setup
                </span>
              </div>
              <div className="exp-body">
                <div className="hypothesis-box">
                  <strong>Hypothesis:</strong> {exp.hypothesis}
                </div>
                <p className="implementation">
                  <strong>Implementation:</strong> {exp.implementation}
                </p>
                <div className="exp-metrics">
                  <div className="metric">
                    <span>Primary Metric</span>
                    <strong>{exp.primaryMetric}</strong>
                  </div>
                  <div className="metric">
                    <span>Expected Impact</span>
                    <strong className="text-success"><ArrowUpRight size={14}/> {exp.expectedImpact}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
