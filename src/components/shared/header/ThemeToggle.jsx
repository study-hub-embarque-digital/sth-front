import React, { useState, useEffect } from 'react';
import { MaterialUISwitch } from './MuiSwitch'; 

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("preferredTheme") || "light";
    setIsDarkMode(currentTheme === "dark");
    document.documentElement.setAttribute("data-toolpad-color-scheme", currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute("data-toolpad-color-scheme", newTheme);
    localStorage.setItem("preferredTheme", newTheme); 
  };

  return (
    <MaterialUISwitch
      checked={isDarkMode}
      onChange={toggleTheme}
    />
  );
};

export default ThemeToggle;
