import React from 'react';
import { UilSun, UilMoon } from '@iconscout/react-unicons';
import { useDarkMode } from './DarkModeContext';
import './App.css';

const DarkMode = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="dark_mode">
      <input
        type="checkbox"
        className="dark_mode_input"
        id="darkModeToggle"
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
      <label className="dark_mode_label" htmlFor="darkModeToggle">
        <div className={`icon-container ${isDarkMode ? 'dark' : 'light'}`}>
          <UilSun className="sun" />
          <UilMoon className="moon" />
        </div>
      </label>
    </div>
  );
};

export default DarkMode;



