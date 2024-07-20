import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AddTask from './AddTask';
import TaskStatus from './TaskStatus';
import RemoveTask from './RemoveTask';
import UpdateTask from './UpdateTask';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-indigo-800 text-gray-200 p-6 shadow-lg flex flex-col">
        <h1 className="text-3xl font-extrabold mb-8 text-white">CRUD Operation</h1>
        <ul className="flex-1">
          <li className="mb-5">
            <Link to="add-task" className="block text-lg font-medium text-indigo-200 hover:text-white p-3 rounded-lg transition duration-300 hover:bg-indigo-700">Add Task</Link>
          </li>
          <li className="mb-5">
            <Link to="task-status" className="block text-lg font-medium text-indigo-200 hover:text-white p-3 rounded-lg transition duration-300 hover:bg-indigo-700">Task Status</Link>
          </li>
          <li className="mb-5">
            <Link to="remove-task" className="block text-lg font-medium text-indigo-200 hover:text-white p-3 rounded-lg transition duration-300 hover:bg-indigo-700">Remove Task</Link>
          </li>
          <li>
            <Link to="update-task" className="block text-lg font-medium text-indigo-200 hover:text-white p-3 rounded-lg transition duration-300 hover:bg-indigo-700">Update Task</Link>
          </li>
        </ul>
      </nav>
      <div className="flex-1 p-6">
        <Routes>
          <Route path="add-task" element={<AddTask />} />
          <Route path="task-status" element={<TaskStatus />} />
          <Route path="remove-task" element={<RemoveTask />} />
          <Route path="update-task" element={<UpdateTask />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
