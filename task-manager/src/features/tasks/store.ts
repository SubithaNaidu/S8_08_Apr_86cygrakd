import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';

// ✅ Load tasks from localStorage if present
const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      return { tasks: { tasks: JSON.parse(stored) } };
    }
  } catch (e) {
    console.error('Error loading from localStorage:', e);
  }
  return undefined;
};

// ✅ Save to localStorage when state changes
const saveToLocalStorage = (state: any) => {
  try {
    const serialized = JSON.stringify(state.tasks.tasks);
    localStorage.setItem('tasks', serialized);
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
};

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer
  },
  preloadedState
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
