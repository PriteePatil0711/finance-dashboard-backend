import { useEffect, useState } from 'react';
import api from '../services/api';

function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const response = await api.get('/dashboard/summary');
        setSummary(response.data.summary);
      } catch (e) {
        setError(e.response?.data?.message || 'Unable to load dashboard.');
      }
    };
    loadSummary();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="panel-card">
        <h2 className="section-title">Dashboard Summary</h2>
        {error && <div className="error-text">{error}</div>}
        {summary ? (
          <div>
            <p><strong>Total Income:</strong> ${summary.totalIncome.toFixed(2)}</p>
            <p><strong>Total Expense:</strong> ${summary.totalExpense.toFixed(2)}</p>
            <p><strong>Net Balance:</strong> ${summary.netBalance.toFixed(2)}</p>
          </div>
        ) : (
          <p>Loading summary...</p>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
