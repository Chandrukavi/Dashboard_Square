import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskStatus = () => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Task Status</h2>
      {tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map(task => (
            <li key={task._id} className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
              <div className="font-medium text-gray-700">
                <strong>Team Name:</strong> {task.teamName}
              </div>
              <div className="font-medium text-gray-700">
                <strong>Assessment:</strong> {task.assessment}
              </div>
              <div className="font-medium text-gray-700">
                <strong>Submit Date:</strong> {task.submitDate}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskStatus;
