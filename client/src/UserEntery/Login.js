import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.emailOrUsername) errors.emailOrUsername = 'Username or Email is required';
    if (!formData.password) errors.password = 'Password is required';

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3005/api/auth/login', formData);
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard/add-task'); 
      } catch (error) {
        console.error(error);
        setErrors({ form: 'Invalid credentials' });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-6 text-white text-center">Welcome to Square Dashboard</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-medium mb-2">Username or Email:</label>
            <input
              type="text"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.emailOrUsername && <p className="text-red-400 text-xs mt-1">{errors.emailOrUsername}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-200 text-sm font-medium mb-2">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Login
          </button>
          {errors.form && <p className="text-red-400 text-xs mt-2 text-center">{errors.form}</p>}
          <div className="mt-4 text-center">
            <Link to="/signup" className="text-gray-400 hover:underline">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
