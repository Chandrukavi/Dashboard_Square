import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateTask = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const [formData, setFormData] = useState({
    teamName: '',
    assessment: '',
    submitDate: ''
  });

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

  useEffect(() => {
    const fetchTaskDetails = async () => {
      if (selectedTask) {
        try {
          const response = await axios.get(`http://localhost:3005/api/tasks/${selectedTask}`);
          setFormData({
            teamName: response.data.teamName,
            assessment: response.data.assessment,
            submitDate: response.data.submitDate
          });
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchTaskDetails();
  }, [selectedTask]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3005/api/tasks/${selectedTask}`, formData);
      alert('Task updated successfully');
      setFormData({ teamName: '', assessment: '', submitDate: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Task</h2>
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Team Name:</label>
          <input
            type="text"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            placeholder="Team Name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Assessment:</label>
          <input
            type="text"
            name="assessment"
            value={formData.assessment}
            onChange={handleChange}
            placeholder="Assessment"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Submit Date:</label>
          <input
            type="date"
            name="submitDate"
            value={formData.submitDate}
            onChange={handleChange}
            placeholder="Submit Date"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
