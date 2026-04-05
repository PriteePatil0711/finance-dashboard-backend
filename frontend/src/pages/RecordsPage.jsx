import { useEffect, useState } from 'react';
import api, { updateRecord, getUserRole } from '../services/api';

function RecordsPage() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ amount: '', type: 'expense', category: '', date: '', note: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const role = getUserRole();

  const loadRecords = async () => {
    try {
      const response = await api.get('/records');
      setRecords(response.data.records || []);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load records.');
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = {
        amount: Number(form.amount),
        type: form.type,
        category: form.category,
        date: form.date,
        note: form.note
      };

      if (editId) {
        await updateRecord(editId, formData);
      } else {
        await api.post('/records', formData);
      }

      setForm({ amount: '', type: 'expense', category: '', date: '', note: '' });
      setEditId(null);
      loadRecords();
    } catch (e) {
      setError(e.response?.data?.message || 'Unable to save record.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/records/${id}`);
      loadRecords();
    } catch (e) {
      setError(e.response?.data?.message || 'Unable to delete record.');
    }
  };

  const handleEdit = (record) => {
    setForm({
      amount: record.amount.toString(),
      type: record.type,
      category: record.category,
      date: record.date.split('T')[0],
      note: record.note
    });
    setEditId(record._id);
  };

  return (
    <div className="page-wrapper">
      <div className="form-card">
        <h2 className="section-title">{editId ? 'Edit Financial Record' : 'Add Financial Record'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Amount</label>
          <input name="amount" type="number" step="0.01" value={form.amount} onChange={handleChange} required />
          <label>Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <label>Category</label>
          <input name="category" value={form.category} onChange={handleChange} required />
          <label>Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} required />
          <label>Note</label>
          <input name="note" value={form.note} onChange={handleChange} />
          {error && <div className="error-text">{error}</div>}
          <button type="submit" disabled={loading}>{loading ? 'Saving...' : editId ? 'Update Record' : 'Add Record'}</button>
        </form>
      </div>

      <div className="panel-card" style={{ marginTop: 24 }}>
        <h2 className="section-title">Records</h2>
        {error && <div className="error-text">{error}</div>}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Type</th>
                <th>Category</th>
                <th>Date</th>
                <th>Note</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id}>
                  <td>${record.amount.toFixed(2)}</td>
                  <td>{record.type}</td>
                  <td>{record.category}</td>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>{record.note}</td>
                  <td>
                    {(role === 'admin' || role === 'analyst') && (
                      <button type="button" onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
                        Edit
                      </button>
                    )}
                    <button type="button" onClick={() => handleDelete(record._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RecordsPage;
