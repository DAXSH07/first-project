import React, { useState, useEffect } from 'react';
import './App.css';
import TaskCreation from './components/TaskCreation';
import KanbanBoard from './components/KanbanBoard';
import GanttChart from './components/GanttChart';
import TaskList from './components/TaskList';
import CalendarView from './components/CalendarView';
import Header from './components/header';

function App() {
    const [tasks, setTasks] = useState([]);
    const [view, setView] = useState('Task List');

    // Fetch tasks from the backend when the app is loaded
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/tasks');
                if (response.ok) {
                    const data = await response.json();
                    setTasks(data); // Store tasks fetched from the database
                } else {
                    console.error('Failed to fetch tasks');
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks(); // Call the function to fetch tasks on component load
    }, []); // Empty dependency array ensures this runs only once when component loads

    const handleTaskAdded = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Remove the task from the frontend state
                setTasks(tasks.filter((task) => task._id !== taskId));
            } else {
                console.error('Failed to delete task from the backend');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="app">
            <Header />
            <div className="app-body">
                <div className="content">
                    <h1>Task Manager</h1>
                    {/* Task Creation Form */}
                    <TaskCreation onTaskAdded={handleTaskAdded} taskList={tasks} />

                    {/* View Buttons */}
                    <div className="view-buttons">
                        <button onClick={() => setView('Task List')}>Task List</button>
                        <button onClick={() => setView('Kanban Board')}>Kanban Board</button>
                        <button onClick={() => setView('Gantt Chart')}>Gantt Chart</button>
                        <button onClick={() => setView('Calendar')}>Calendar</button>
                    </div>

                    {/* Conditional Rendering of Views */}
                    {view === 'Task List' && <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />}
                    {view === 'Kanban Board' && <KanbanBoard tasks={tasks} onDeleteTask={handleDeleteTask} />}
                    {view === 'Gantt Chart' && <GanttChart tasks={tasks} />}
                    {view === 'Calendar' && <CalendarView tasks={tasks} />}
                </div>
            </div>
        </div>
    );
}

export default App;
