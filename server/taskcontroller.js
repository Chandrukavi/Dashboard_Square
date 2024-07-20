const Task = require('./modules/task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addTask = async (req, res) => {
  try {
    const { teamName, assessment, submitDate } = req.body;

    if (!teamName || !assessment || !submitDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newTask = new Task({ teamName, assessment, submitDate });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { teamName, assessment, submitDate } = req.body;
    const taskId = req.params.id;

    if (!teamName || !assessment || !submitDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, { teamName, assessment, submitDate }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.removeTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
