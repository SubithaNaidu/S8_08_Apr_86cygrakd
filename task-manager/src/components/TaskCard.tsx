import React from 'react';
import { Task } from '../features/tasks/tasksSlice';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (checked: boolean) => void;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onClick }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const cardStyles: React.CSSProperties = {
    borderRadius: '12px',
    padding: '18px',
    marginBottom: '16px',
    cursor: 'pointer',
    background:
      theme === 'light'
        ? 'linear-gradient(145deg, #f0f0f0, #ffffff)'
        : 'linear-gradient(145deg, #1f1f1f, #2c2c2c)',
    color: theme === 'light' ? '#000' : '#fff',
    boxShadow:
      theme === 'light'
        ? '6px 6px 15px rgba(0,0,0,0.1), -6px -6px 15px rgba(255,255,255,0.5)'
        : '6px 6px 15px rgba(0,0,0,0.6), -6px -6px 15px rgba(255,255,255,0.05)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.boxShadow =
      theme === 'light'
        ? '10px 10px 20px rgba(0,0,0,0.15), -4px -4px 10px rgba(255,255,255,0.4)'
        : '8px 8px 20px rgba(0,0,0,0.7), -4px -4px 10px rgba(255,255,255,0.02)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = cardStyles.boxShadow!;
  };

  return (
    <div
      style={cardStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => onToggleComplete(e.target.checked)}
          style={{ marginRight: '12px' }}
        />
        <h2
          style={{
            textDecoration: task.completed ? 'line-through' : 'none',
            fontWeight: 600,
            color: 'orange',
            flex: 1,
            cursor: 'pointer',
          }}
        >
          {task.title}
        </h2>
      </div>
      <p>
        <strong style={{ color: 'violet' }}>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong style={{ color: 'violet' }}>Status:</strong> {task.status}
      </p>
      <p>
        <strong style={{ color: 'violet' }}>Due Date:</strong> {task.dueDate}
      </p>
    </div>
  );
};

export default TaskCard;
