import React from 'react';
import { FrappeGantt } from 'frappe-gantt-react';

const GanttChart = ({ tasks, updateTask }) => {
    const validTasks = tasks.filter(task => task.start && task.end && task.name);

    const handleTaskDateChange = (updatedTask) => {
        // Capture the new task dates and other changes
        console.log('Updated Task:', updatedTask);

        // Call the updateTask function passed down from the parent to update the task in the backend and task list
        updateTask(updatedTask);
    };

    return (
        <div className="gantt-chart">
            {validTasks.length > 0 ? (
                <FrappeGantt
                    tasks={validTasks}
                    viewMode="Month"
                    onClick={(task) => console.log('Task clicked:', task)}
                    onDateChange={handleTaskDateChange} // Capture date change from Gantt chart
                />
            ) : (
                <p>No tasks to display on Gantt Chart</p>
            )}
        </div>
    );
};

export default GanttChart;
