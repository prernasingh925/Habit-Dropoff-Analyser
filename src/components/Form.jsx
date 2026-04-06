import { useState } from 'react';
import { Play, Activity, Rocket } from 'lucide-react';

const SAMPLE_SCENARIOS = {
  phonepe: {
    habitName: "Send money via UPI",
    appCategory: "Fintech/Payments",
    stage1: { name: "See 'Send Money' notification", dropoff: 15 },
    stage2: { name: "Open app, enter UPI ID, authenticate", dropoff: 38 },
    stage3: { name: "Money sent, recipient notified", dropoff: 12 },
    retention: { d1: 40, d7: 18, d30: 5 },
    context: "Speed is slow on stage 2",
  },
  swiggy: {
    habitName: "Swiggy Reorder",
    appCategory: "Food Delivery",
    stage1: { name: "App Open & Browse previous orders", dropoff: 22 },
    stage2: { name: "Add to cart & Checkout", dropoff: 31 },
    stage3: { name: "Payment & Order Confirmation", dropoff: 8 },
    retention: { d1: 35, d7: 28, d30: 10 },
    context: "Checkout seems to have friction, maybe high delivery fees.",
  },
  health: {
    habitName: "Morning Workout Logging",
    appCategory: "Health & Fitness",
    stage1: { name: "Morning push notification", dropoff: 45 },
    stage2: { name: "Open app and select workout", dropoff: 28 },
    stage3: { name: "Complete and share workout", dropoff: 5 },
    retention: { d1: 30, d7: 12, d30: 2 },
    context: "Users are ignoring the trigger notification.",
  }
};

const CATEGORIES = [
  "Fintech/Payments",
  "Food Delivery",
  "Shopping & D2C",
  "Health & Fitness",
  "Learning & EdTech",
  "Other"
];

const INITIAL_FORM = {
  habitName: '',
  appCategory: CATEGORIES[0],
  stage1: { name: '', dropoff: '' },
  stage2: { name: '', dropoff: '' },
  stage3: { name: '', dropoff: '' },
  retention: { d1: '', d7: '', d30: '' },
  context: '',
};

export default function Form({ onAnalyze, isLoading }) {
  const [formData, setFormData] = useState(INITIAL_FORM);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const loadScenario = (key) => {
    setFormData(SAMPLE_SCENARIOS[key]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(formData);
  };

  return (
    <div className="form-container">
      <div className="scenario-buttons">
        <button type="button" onClick={() => loadScenario('phonepe')} className="btn-scenario">
          <Activity size={14} /> PhonePe UPI
        </button>
        <button type="button" onClick={() => loadScenario('swiggy')} className="btn-scenario">
          <Rocket size={14} /> Swiggy Reorder
        </button>
        <button type="button" onClick={() => loadScenario('health')} className="btn-scenario">
          <Play size={14} /> Health App
        </button>
      </div>

      <form onSubmit={handleSubmit} className="diagnostic-form">
        <div className="form-group primary-fields">
          <label>Habit Name</label>
          <input required name="habitName" maxLength="50" value={formData.habitName} onChange={handleChange} placeholder="e.g. Send money via UPI" />
        </div>
        <div className="form-group primary-fields">
          <label>App Category</label>
          <select required name="appCategory" value={formData.appCategory} onChange={handleChange}>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div className="stages-container">
          {[1, 2, 3].map(num => (
            <div key={num} className="stage-card">
              <div className="stage-header">
                <span className="stage-badge">{num}</span>
                <h4>Stage {num} {num===1 ? '(Trigger)' : num===2 ? '(Routine)' : '(Reward)'}</h4>
              </div>
              <div className="stage-inputs">
                <input required name={`stage${num}.name`} value={formData[`stage${num}`].name} onChange={handleChange} placeholder="Step description" />
                <div className="dropoff-input">
                  <input required type="number" min="0" max="100" name={`stage${num}.dropoff`} value={formData[`stage${num}`].dropoff} onChange={handleChange} placeholder="%" />
                  <span className="suffix">% drop</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="optional-section">
          <h4>Retention % (Optional)</h4>
          <div className="retention-inputs">
            <input type="number" min="0" max="100" name="retention.d1" value={formData.retention.d1} onChange={handleChange} placeholder="D1" />
            <input type="number" min="0" max="100" name="retention.d7" value={formData.retention.d7} onChange={handleChange} placeholder="D7" />
            <input type="number" min="0" max="100" name="retention.d30" value={formData.retention.d30} onChange={handleChange} placeholder="D30" />
          </div>
        </div>

        <div className="form-group">
          <label>Additional Context (Optional)</label>
          <textarea maxLength="300" name="context" value={formData.context} onChange={handleChange} placeholder="Any specific PM insights or analytics hints?" rows="3" />
        </div>

        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? <div className="spinner"></div> : 'Diagnose Habit Loop'}
        </button>
      </form>
    </div>
  );
}
