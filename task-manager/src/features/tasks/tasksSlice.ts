import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ✅ Task interface
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  tags: string[];
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
}

// ✅ Redux state shape
interface TasksState {
  tasks: Task[];
}

// ✅ Initial state
const initialState: TasksState = {
  tasks: []
};

// ✅ Update payload type to support partial updates
interface UpdateTaskPayload {
  id: string;
  changes: Partial<Task>;
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    // ✅ Modified to support partial updates
    updateTask: (state, action: PayloadAction<UpdateTaskPayload>) => {
      const { id, changes } = action.payload;
      const index = state.tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...changes };
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    }
  }
});

// ✅ Export actions and reducer
export const { toggleTask, addTask, deleteTask, updateTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
