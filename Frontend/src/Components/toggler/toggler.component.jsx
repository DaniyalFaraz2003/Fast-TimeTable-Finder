import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const Toggler = (props) => {
  const prefersDarkMode = useMediaQuery({ query: '(prefers-color-scheme: dark)' });
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  useEffect(() => {
    setIsDarkMode(prefersDarkMode);
    document.documentElement.classList.toggle('dark', prefersDarkMode);
  }, [prefersDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    props.setHeaderMode(!isDarkMode)
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="w-12 h-6 rounded-full p-1 bg-gray-500 dark:bg-gray-600 relative transition-colors duration-500 ease-in focus:outline-none focus:ring-2 focus:ring-light-blue dark:focus:ring-white focus:border-transparent"
    >
      <div
        id="toggle"
        className="rounded-full w-4 h-4 bg-light-blue dark:bg-dark-violet relative ml-0 dark:ml-6 pointer-events-none transition-all duration-300 ease-out"
      ></div>
    </button>
  );
};

export default Toggler;
