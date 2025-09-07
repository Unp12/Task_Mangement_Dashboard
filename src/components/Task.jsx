import React, { useState } from 'react';

const Task = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleUpdate = () => {
    updateTask(task._id, updatedTask);
    setIsEditing(false);
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <div className="task-edit-form">
          <input type="text" value={updatedTask.title} onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })} />
          <textarea value={updatedTask.description} onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })} />
          <select value={updatedTask.status} onChange={(e) => setUpdatedTask({ ...updatedTask, status: e.target.value })}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="task-display">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Task;