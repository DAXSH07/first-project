// src/components/sidebar.js
import React from 'react';
import './sidebar.css';  // Import CSS for sidebar styling

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Projects</h2>
      <ul>
        <li><a href="#project1">Project 1</a></li>
        <li><a href="#project2">Project 2</a></li>
        <li><a href="#project3">Project 3</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;
