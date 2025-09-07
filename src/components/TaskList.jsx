import React, { useState, useEffect } from 'react';
import API from '../services/api'; // Import API
import Task from './Task';
import TaskForm from './TaskForm';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get('tasks'); // Use API.get
        setTasks(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (taskData) => {
    try {
      const res = await API.post('/tasks', taskData); // Use API.post
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id, updatedTaskData) => {
    try {
      const res = await API.put(`/tasks/${id}`, updatedTaskData); // Use API.put
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`); // Use API.delete
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="task-list-container">
      <TaskForm addTask={addTask} />
      {tasks.map((task) => (
        <Task key={task._id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
      ))}
    </div>
  );
};

export default TaskList;