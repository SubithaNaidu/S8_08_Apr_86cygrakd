import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../features/tasks/store';
import { Task } from '../features/tasks/tasksSlice';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const TaskList: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const bgColor = theme === 'light' ? '#fff' : '#1a1a1a';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const cardBg = theme === 'light' ? '#f1f1f1' : '#2a2a2a';

  return (
    <div style={{ padding: '30px', backgroundColor: bgColor, color: textColor, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>📋Task List</h3>
        
      </div>

      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        tasks.map((task: Task) => (
          <div
            key={task.id}
            onClick={() => navigate(`/task/${task.id}`)}
            style={{
              backgroundColor: cardBg,
              marginTop: '16px',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
