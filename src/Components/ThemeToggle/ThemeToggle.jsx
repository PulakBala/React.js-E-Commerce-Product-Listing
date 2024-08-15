// src/Components/ThemeToggle/ThemeToggle.jsx
import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check for saved theme in localStorage and set it
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme); // Save theme to localStorage
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="flex items-center mb-4 px-4 py-2 border w-full rounded bg-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      {theme === 'light' ? (
        <FaMoon className="text-gray-600 dark:text-gray-400" />
      ) : (
        <FaSun className="text-yellow-400" />
      )}
      <span className="ml-2">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
    </button>
  );
};

export default ThemeToggle;
