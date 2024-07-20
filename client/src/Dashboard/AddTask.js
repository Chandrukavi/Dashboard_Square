import React, { useState } from 'react';
import axios from 'axios';

const AddTask = () => {
  const [formData, setFormData] = useState({
    teamName: '',
    assessment: '',
    submitDate: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.teamName) errors.teamName = 'Team Name is required';
    if (!formData.assessment) errors.assessment = 'Assessment is required';
    if (!formData.submitDate) errors.submitDate = 'Submit Date is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await axios.post('http://localhost:3005/api/tasks', formData);
        alert('Task added successfully');
        setFormData({ teamName: '', assessment: '', submitDate: '' });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Team Name:</label>
          <input
            type="text"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.teamName && <span className="text-red-500 text-sm">{errors.teamName}</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Assessment:</label>
          <input
            type="text"
            name="assessment"
            value={formData.assessment}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.assessment && <span className="text-red-500 text-sm">{errors.assessment}</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Submit Date:</label>
          <input
            type="date"
            name="submitDate"
            value={formData.submitDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.submitDate && <span className="text-red-500 text-sm">{errors.submitDate}</span>}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
