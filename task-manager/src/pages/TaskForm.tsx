import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../features/tasks/tasksSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../features/tasks/store';
import Snackbar from '../components/Snackbar';

interface FormValues {
  title: string;
  description: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'To Do' | 'In Progress' | 'Done';
  tags: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  dueDate: Yup.date()
    .min(new Date().toISOString().split('T')[0], 'Due date must be in the future')
    .required('Due date is required'),
  priority: Yup.string().oneOf(['Low', 'Medium', 'High']).required(),
  status: Yup.string().oneOf(['To Do', 'In Progress', 'Done']).required(),
  tags: Yup.string(),
});

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const isEdit = Boolean(id);
  const taskToEdit = useSelector((state: RootState) =>
    state.tasks.tasks.find((task) => task.id === id)
  );

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const initialValues: FormValues = isEdit && taskToEdit
    ? {
        title: taskToEdit.title,
        description: taskToEdit.description,
        dueDate: taskToEdit.dueDate,
        priority: taskToEdit.priority,
        status: taskToEdit.status,
        tags: taskToEdit.tags?.join(', ') || '',
      }
    : {
        title: '',
        description: '',
        dueDate: '',
        priority: 'Low',
        status: 'To Do',
        tags: '',
      };

  const handleSubmit = (values: FormValues) => {
    let tagsArray = values.tags
      ? values.tags.split(',').map((tag) => tag.trim())
      : [];

    // Add title as tag if no tags provided
    if (tagsArray.length === 0 && values.title) {
      tagsArray.push(values.title.trim());
    }

    if (isEdit && taskToEdit) {
      dispatch(
        updateTask({
          id: taskToEdit.id,
          changes: {
            ...values,
            tags: tagsArray,
          },
        })
      );
      setSnackbarMessage('✅ Task updated successfully!');
    } else {
      dispatch(
        addTask({
          id: uuidv4(),
          ...values,
          tags: tagsArray,
          completed: false,
        })
      );
      setSnackbarMessage('🎉 Task added successfully!');
    }

    setShowSnackbar(true);

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '2rem',
              borderRadius: '1rem',
              backgroundColor: 'white',
              color: 'black',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              width: '100%',
              maxWidth: '500px',
            }}
          >
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#1e40af',
              }}
            >
              {isEdit ? 'Edit Task' : 'Add Task'}
            </h2>

            <label style={{ color: '#334155', fontWeight: 500 }}>Title</label>
            <Field
              name="title"
              placeholder="Enter title"
              style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #ccc' }}
            />
            <div style={{ color: '#dc2626', fontSize: '0.875rem' }}>
              <ErrorMessage name="title" />
            </div>

            <label style={{ color: '#334155', fontWeight: 500 }}>Description</label>
            <Field
              name="description"
              as="textarea"
              placeholder="Enter description"
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid #ccc',
                minHeight: '100px',
              }}
            />

            <label style={{ color: '#334155', fontWeight: 500 }}>Due Date</label>
            <Field
              type="date"
              name="dueDate"
              style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #ccc' }}
            />
            <div style={{ color: '#dc2626', fontSize: '0.875rem' }}>
              <ErrorMessage name="dueDate" />
            </div>

            <label style={{ color: '#334155', fontWeight: 500 }}>Priority</label>
            <Field
              as="select"
              name="priority"
              style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #ccc' }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Field>

            <label style={{ color: '#334155', fontWeight: 500 }}>Status</label>
            <Field
              as="select"
              name="status"
              style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #ccc' }}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Field>

            <label style={{ color: '#334155', fontWeight: 500 }}>Tags (comma-separated)</label>
            <Field
              name="tags"
              placeholder="e.g. urgent, personal"
              style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #ccc' }}
            />

            <button
              type="submit"
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
            >
              {isEdit ? 'Update Task' : 'Add Task'}
            </button>
          </Form>
        )}
      </Formik>

      {showSnackbar && (
        <Snackbar
          message={snackbarMessage}
          onClose={() => setShowSnackbar(false)}
        />
      )}
    </div>
  );
};

export default TaskForm;
