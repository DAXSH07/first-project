import React from 'react';

const KanbanBoard = ({ tasks, onDeleteTask }) => {
  const todoTasks = tasks.filter(task => task.status === 'To Do');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const doneTasks = tasks.filter(task => task.status === 'Done');

  // Ensure each column maintains its own task index for deletion
  const handleDeleteTask = (taskToDelete, column) => {
    const taskIndexInOriginalList = tasks.findIndex(
      task => task.name === taskToDelete.name && task.status === column
    );
    onDeleteTask(taskIndexInOriginalList);
  };

  return (
    <div className="kanban-board">
      {/* To Do Column */}
      <div className="kanban-column">
        <h3>To Do</h3>
        {todoTasks.map((task, index) => (
          <div key={index} className="kanban-card">
            <div className="task-details">
              <div><strong>Task:</strong> {task.name}</div>
              <div><strong>Owner:</strong> {task.owner}</div>
              <div><strong>Due Date:</strong> {task.end}</div>
              <div><strong>Priority:</strong> {task.priority}</div>
            </div>
            <button
              onClick={() => handleDeleteTask(task, 'To Do')}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* In Progress Column */}
      <div className="kanban-column">
        <h3>In Progress</h3>
        {inProgressTasks.map((task, index) => (
          <div key={index} className="kanban-card">
            <div className="task-details">
              <div><strong>Task:</strong> {task.name}</div>
              <div><strong>Owner:</strong> {task.owner}</div>
              <div><strong>Due Date:</strong> {task.end}</div>
              <div><strong>Priority:</strong> {task.priority}</div>
            </div>
            <button
              onClick={() => handleDeleteTask(task, 'In Progress')}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Done Column */}
      <div className="kanban-column">
        <h3>Done</h3>
        {doneTasks.map((task, index) => (
          <div key={index} className="kanban-card">
            <div className="task-details">
              <div><strong>Task:</strong> {task.name}</div>
              <div><strong>Owner:</strong> {task.owner}</div>
              <div><strong>Due Date:</strong> {task.end}</div>
              <div><strong>Priority:</strong> {task.priority}</div>
            </div>
            <button
              onClick={() => handleDeleteTask(task, 'Done')}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
