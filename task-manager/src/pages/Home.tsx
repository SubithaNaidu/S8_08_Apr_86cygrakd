import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../features/tasks/store';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import { Task, updateTask } from '../features/tasks/tasksSlice';

const Home: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleToggleComplete = (taskId: string, completed: boolean) => {
    const updatedStatus = completed ? 'Done' : 'To Do';
    dispatch(updateTask({ id: taskId, changes: { completed, status: updatedStatus } }));
  };

  const filteredTasks = tasks.filter((task: Task) => {
    const matchesStatus = !statusFilter || task.status === statusFilter;
    const matchesPriority = !priorityFilter || task.priority === priorityFilter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div
      style={{
        padding: '1rem',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
      }}
    >
      {/* Search Bar */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem 1rem',
            border: '1px solid #ccc',
            borderRadius: '0.375rem',
            backgroundColor: 'white',
            color: 'black',
          }}
        />
      </div>

      {/* Filters and Add Task Button */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '0.5rem 0.75rem',
            border: '1px solid #ccc',
            borderRadius: '0.375rem',
          }}
        >
          <option value="">All Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          style={{
            padding: '0.5rem 0.75rem',
            border: '1px solid #ccc',
            borderRadius: '0.375rem',
          }}
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button
          onClick={() => navigate('/add')}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            border: 'none',
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = '#2563eb')
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = '#3b82f6')
          }
        >
          + Add Task
        </button>
      </div>

      {/* Task List */}
      <div>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} style={{ marginBottom: '1rem' }}>
              <TaskCard
                task={task}
                onClick={() => navigate(`/task/${task.id}`)}
                onToggleComplete={(checked) => handleToggleComplete(task.id, checked)}
              />
            </div>
          ))
        ) : (
          <p style={{ color: '#6b7280' }}>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
