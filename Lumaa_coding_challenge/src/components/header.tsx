import React from 'react';
import './../styles/header.css';

interface HeaderProps {
  username: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Task Manager</h1>
        <div className="username">{username}</div>
      </div>
    </header>
  );
};

export default Header;