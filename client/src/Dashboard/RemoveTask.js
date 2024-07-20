import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RemoveTask = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  const handleRemove = async () => {
    try {
      await axios.delete(`http://localhost:3005/api/tasks/${selectedTask}`);
      alert('Task removed successfully');
      setSelectedTask('');
      setTasks(tasks.filter(task => task._id !== selectedTask));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Remove Task</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Select Task:</label>
        <select
          onChange={(e) => setSelectedTask(e.target.value)}
          value={selectedTask}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Task</option>
          {tasks.map(task => (
            <option key={task._id} value={task._id}>
              {task.teamName} - {task.assessment}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleRemove}
        className="w-full bg-red-600 text-white p-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
      >
        Remove Task
      </button>
    </div>
  );
};

export default RemoveTask;
