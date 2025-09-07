import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import TaskList from './components/TaskList';
import './App.css'; // Import CSS

const App = () => {
  const isAuthenticated = () => !!localStorage.getItem('token');

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/api/users/register" />} />
          <Route path="/login" element={<AuthForm isLogin={true} />} />
          <Route path="/api/users/register" element={<AuthForm isLogin={false} />} />
          <Route path="/tasks" element={isAuthenticated() ? <TaskList /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;