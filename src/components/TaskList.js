import React from 'react';

// Assuming you have a TaskList component that receives tasks and an onDeleteTask function
const TaskList = ({ tasks, onDeleteTask }) => (
    <table className="task-list-table">
        <thead>
            <tr>
                <th>Task Name</th>
                <th>Owner</th>
                <th>Priority</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {tasks.map((task) => (
                <tr key={task._id}>
                    <td>{task.name}</td>
                    <td>{task.owner}</td>
                    <td>{task.priority}</td>
                    <td>{task.start}</td>
                    <td>{task.end}</td>
                    <td>{task.description}</td>
                    <td>{task.status}</td>
                    <td>
                        <button
                            className="delete-button"
                            onClick={() => onDeleteTask(task._id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);


export default TaskList;
