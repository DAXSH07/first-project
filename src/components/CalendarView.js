import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = ({ tasks }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [taskOnDate, setTaskOnDate] = useState([]);

    // Function to handle day click
    const handleDateClick = (date) => {
        setSelectedDate(date);
        // Filter tasks to find the ones with due dates matching the clicked date
        const tasksForSelectedDate = tasks.filter(
            (task) => task.end === date.toISOString().split('T')[0]
        );
        setTaskOnDate(tasksForSelectedDate);
    };

    // Function to highlight the due date on the calendar
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const taskDue = tasks.find((task) => task.end === date.toISOString().split('T')[0]);
            if (taskDue) {
                return <div className="due-date-dot"></div>;
            }
        }
        return null;
    };

    return (
        <div className="calendar-view">
            <Calendar
                onClickDay={handleDateClick}
                tileContent={tileContent}
            />

            {taskOnDate.length > 0 && (
                <div className="task-details">
                    <h3>Tasks for {selectedDate.toDateString()}:</h3>
                    <ul>
                        {taskOnDate.map((task) => (
                            <li key={task.id}>
                                <strong>{task.name}</strong> - {task.description} (Owner: {task.owner})
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {taskOnDate.length === 0 && selectedDate && (
                <div className="task-details">
                    <h3>No tasks for {selectedDate.toDateString()}</h3>
                </div>
            )}
        </div>
    );
};

export default CalendarView;
