import { Task } from './tasksSlice';
import { RootState } from './store'; // ✅ Adjusted path

export const selectAllTasks = (state: RootState): Task[] => state.tasks.tasks;

export const selectCompletedTasks = (state: RootState): Task[] =>
  state.tasks.tasks.filter((task: Task) => task.completed);

export const selectPendingTasks = (state: RootState): Task[] =>
  state.tasks.tasks.filter((task: Task) => !task.completed);

export const selectUniqueTags = (state: RootState): string[] => {
  const tagSet = new Set<string>();
  state.tasks.tasks.forEach((task: Task) => {
    task.tags?.forEach((tag: string) => tagSet.add(tag));
  });
  return Array.from(tagSet);
};
