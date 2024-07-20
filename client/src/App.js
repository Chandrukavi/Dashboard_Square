import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './UserEntery/Signup';
import Login from './UserEntery/Login';
import Dashboard from './Dashboard/Dashboard';
import AddTask from './Dashboard/AddTask';
import TaskStatus from './Dashboard/TaskStatus';
import RemoveTask from './Dashboard/RemoveTask';
import UpdateTask from './Dashboard/UpdateTask';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="add-task" element={<AddTask />} />
            <Route path="task-status" element={<TaskStatus />} />
            <Route path="remove-task" element={<RemoveTask />} />
            <Route path="update-task" element={<UpdateTask />} />
            {/* Default route for dashboard */}
            <Route index element={<AddTask />} /> {/* Default component to display when navigating to /dashboard */}
          </Route>

          {/* Redirect to login by default */}
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
