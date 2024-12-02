import React from 'react';
import logo from '../assets/LOGO.jpg'; // Import the logo image

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        {/* Replace text with logo image */}
        <img src={logo} alt="March Digital World Logo" className="logo-img" />
      </div>
      <nav className="nav">
        <a href="/home">Home</a>
        <a href="/projects">Projects</a>
        <a href="/tasks">Tasks</a>
        <button>Settings</button>
        <button>Login</button>
      </nav>
    </header>
  );
};

export default Header;
