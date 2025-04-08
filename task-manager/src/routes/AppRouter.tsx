import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import TaskForm from '../pages/TaskForm';
import TaskDetails from '../pages/TaskDetails';


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<TaskForm />} />
        <Route path="/edit/:id" element={<TaskForm />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="/edit/:id" element={<TaskForm />} />

      </Routes>
    </Router>
  );
};

export default AppRouter;