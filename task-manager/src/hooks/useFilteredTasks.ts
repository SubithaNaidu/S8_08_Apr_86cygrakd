import { useSelector } from 'react-redux';
import { RootState } from '../features/tasks/store'; // correct the path

export const useFilteredTasks = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  return tasks;
};
