import React from 'react';

export interface FilterBarProps {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  priority: string;
  setPriority: React.Dispatch<React.SetStateAction<string>>;
}

const FilterBar: React.FC<FilterBarProps> = ({ status, setStatus, priority, setPriority }) => {
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const clearFilters = () => {
    setStatus('');
    setPriority('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.dropdownWrapper}>
        <label style={styles.label}>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={styles.select}
          title="Filter by Status"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.dropdownWrapper}>
        <label style={styles.label}>Priority:</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={styles.select}
          title="Filter by Priority"
        >
          {priorityOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {(status || priority) && (
        <button onClick={clearFilters} style={styles.clearBtn} title="Clear Filters">
          ✖ Clear
        </button>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    margin: '20px 10px',
    flexWrap: 'wrap',
  },
  dropdownWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  label: {
    fontWeight: 600,
  },
  select: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
  },
  clearBtn: {
    padding: '6px 12px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500,
  },
};

export default FilterBar;
