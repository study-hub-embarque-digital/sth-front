import { useThemeContext } from '../../../contexts/ThemeContext'
import { MaterialUISwitch } from './MuiSwitch';

const ThemeToggle = () => {
  const { themeName, toggleTheme } = useThemeContext();

  return (
    <MaterialUISwitch 
      checked={themeName === 'dark'} 
      onChange={toggleTheme} 
    />
  );
};

export default ThemeToggle;
