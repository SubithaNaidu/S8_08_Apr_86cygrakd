import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const handleClear = () => onChange('');

  return (
    <div style={{
      position: 'relative',
      width: '50%',
      marginBottom: '16px'
    }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tasks..."
        style={{
          padding: '8px 36px 8px 12px',
          width: '50%',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '14px'
        }}
      />
      {value && (
        <button
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            color: '#888',
            width:'50%',
          }}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;
