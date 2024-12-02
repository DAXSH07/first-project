import React, { useState, useEffect } from 'react';

const TaskCreation = ({ onTaskAdded }) => {
    const [taskName, setTaskName] = useState('');
    const [owner, setOwner] = useState('');
    const [startDate, setStartDate] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('Low');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [dependencies, setDependencies] = useState([]);
    const [subtasks, setSubtasks] = useState([]);
    const [status, setStatus] = useState('To Do');
    const [tasks, setTasks] = useState([]);
    const [subtaskName, setSubtaskName] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/tasks');
                if (response.ok) {
                    const data = await response.json();
                    setTasks(data);
                } else {
                    console.error('Error fetching tasks');
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    const handleTaskAdd = async () => {
        if (!taskName || !startDate || !deadline) {
            alert('Please provide a task name, start date, and deadline.');
            return;
        }

        const newTask = {
            name: taskName,
            owner,
            start: startDate,
            end: deadline,
            description,
            priority,
            category,
            subtasks,
            dependencies,
            status,
        };

        try {
            const response = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                const createdTask = await response.json();
                onTaskAdded(createdTask);
                resetFormFields();
            } else {
                console.error('Failed to add task');
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const resetFormFields = () => {
        setTaskName('');
        setOwner('');
        setStartDate('');
        setDeadline('');
        setPriority('Low');
        setDescription('');
        setCategory('');
        setDependencies([]);
        setSubtasks([]);
        setStatus('To Do');
        setSubtaskName('');
    };

    const handleAddSubtask = () => {
        if (!subtaskName) return;
        const newSubtask = {
            id: Math.random().toString(36).substr(2, 9),
            name: subtaskName,
            status: 'To Do',
        };
        setSubtasks([...subtasks, newSubtask]);
        setSubtaskName('');
    };

    return (
        <div className="task-creation">
            <h2 className="section-title">Basic Information</h2>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="taskName">Task Name:</label>
                    <input
                        id="taskName"
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="owner">Owner:</label>
                    <input
                        id="owner"
                        type="text"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                    />
                </div>
            </div>

            <h2 className="section-title">Dates</h2>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="deadline">Deadline:</label>
                    <input
                        id="deadline"
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                </div>
            </div>

            <h2 className="section-title">Details</h2>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="priority">Priority:</label>
                    <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input
                    id="category"
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="dependencies">Dependencies:</label>
                    <select
                        id="dependencies"
                        multiple
                        value={dependencies}
                        onChange={(e) => setDependencies([...e.target.selectedOptions].map(o => o.value))}
                    >
                        {tasks.map((task) => (
                            <option key={task._id} value={task._id}>
                                {task.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Subtasks:</label>
                    <input
                        type="text"
                        placeholder="Add Subtask"
                        value={subtaskName}
                        onChange={(e) => setSubtaskName(e.target.value)}
                    />
                    <button className="add-subtask-button" onClick={handleAddSubtask}>
                        Add
                    </button>
                </div>
            </div>

            <button className="add-task-button" onClick={handleTaskAdd}>
                Add Task
            </button>
        </div>
    );
};

export default TaskCreation;
