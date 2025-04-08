// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddTask from './pages/TaskForm';
import TaskDetails from './pages/TaskDetails';
import TaskList from './pages/TaskList';
import Header from './pages/Header';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <main style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/edit/:id" element={<AddTask />} /> 
            <Route path="/task/:id" element={<TaskDetails />} />
            <Route path="/tasklist" element={<TaskList />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
