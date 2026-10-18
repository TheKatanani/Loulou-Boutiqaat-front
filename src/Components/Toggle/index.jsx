import React, { useContext } from 'react'
import { darkTheme, lightTheme } from '../../Global/theme'
import { ThemeContext } from '../../Context/index'
import { ToggleStyled } from './styled'

const Toggle = ({ className, showLabel = true }) => {
  const [theme, setTheme] = useContext(ThemeContext)

  const toggleTheme = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const isLight = theme.theme === 'light';
    const nextTheme = isLight ? darkTheme : lightTheme;
    setTheme(nextTheme);
    try {
      localStorage.setItem('theme', nextTheme.theme);
    } catch (err) {
      console.error(err);
    }
  };

  const isDark = theme.theme === 'dark';

  return (
    <ToggleStyled 
      type="button"
      className={`themeToggleBtn ${className || ''}`}
      onClick={toggleTheme}
      isDark={isDark}
      title={isDark ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي'}
      aria-label="تبديل مظهر الموقع"
    >
      <div className="switchTrack">
        <div className="switchThumb">
          <span>{isDark ? '🌙' : '☀️'}</span>
        </div>
      </div>
      {showLabel && (
        <span className="switchLabel">
          {isDark ? 'الوضع الليلي' : 'الوضع النهاري'}
        </span>
      )}
    </ToggleStyled>
  );
};

export default Toggle;