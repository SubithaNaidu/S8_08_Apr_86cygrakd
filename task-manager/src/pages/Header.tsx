import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const Header: React.FC = () => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        marginBottom: '2rem',
        backgroundColor: '#f0f4f8',
        borderRadius: '0.75rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <h1
        style={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          margin: 0,
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: '#1f2937',
            transition: 'color 0.2s ease-in-out',
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#3b82f6')}
          onMouseOut={(e) => (e.currentTarget.style.color = '#1f2937')}
        >
          TaskManager
        </Link>
      </h1>

      {/* Navigation + Theme Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/taskList" style={{ textDecoration: 'none' }}>
          <button
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.95rem',
              transition: 'background-color 0.2s ease-in-out',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = '#2563eb')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = '#3b82f6')
            }
          >
            Tasks List
          </button>
        </Link>

        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
