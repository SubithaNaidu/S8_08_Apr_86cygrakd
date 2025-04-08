import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../features/tasks/store';
import { Task, removeTask } from '../features/tasks/tasksSlice';
import { useTheme } from '../context/ThemeContext';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((t: Task) => t.id === id)
  );

  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete && id) {
      dispatch(removeTask(id));
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        navigate('/');
      }, 2000); // Delay to show snackbar before navigating
    }
  };

  if (!task)
    return <div style={{ padding: '20px', color: 'crimson' }}>Task not found</div>;

  const bgColor = theme === 'light' ? '#ffffff' : '#121212';
  const textColor = theme === 'light' ? '#222' : '#f5f5f5';
  const cardBg = theme === 'light' ? '#f4f4f4' : '#1e1e1e';

  return (
    <div style={{ padding: '30px', minHeight: '100vh', backgroundColor: bgColor }}>
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        backgroundColor: cardBg,
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        color: textColor,
        transition: '0.3s ease-in-out'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              backgroundColor: 'white',
              color: '#333',
              padding: '10px 16px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              cursor: 'pointer'
            }}
          >
            🔙 <strong>Back</strong>
          </button>
        </div>

        <h2 style={{ fontSize: '30px', marginBottom: '15px' }}>{task.title}</h2>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Due Date:</strong> {task.dueDate}</p>
        <p><strong>Priority:</strong> <span style={{ color: getPriorityColor(task.priority) }}>{task.priority}</span></p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Tags:</strong> {task.tags.join(', ')}</p>

        <div style={{ marginTop: '25px', display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate(`/edit/${task.id}`)}
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '10px 18px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            style={{
              backgroundColor: 'crimson',
              color: 'white',
              padding: '10px 18px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* Snackbar */}
      {showSnackbar && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#323232',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '6px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          transition: 'opacity 0.3s ease-in-out',
          zIndex: 999
        }}>
          ✅ Task deleted successfully!
        </div>
      )}
    </div>
  );
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'crimson';
    case 'Medium':
      return 'orange';
    case 'Low':
      return 'green';
    default:
      return 'gray';
  }
};

export default TaskDetails;
