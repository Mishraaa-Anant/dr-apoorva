import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme, THEMES } from '../context/ThemeContext';

export default function ThemeToggle({ showLabels = false, className = '' }) {
  const { theme, setTheme, THEMES: t } = useTheme();

  return (
    <div className={`theme-toggle-group ${className}`}>
      <button
        type="button"
        className={`theme-btn ${theme === t.LIGHT ? 'active' : ''}`}
        onClick={() => setTheme(t.LIGHT)}
        title="Minimalist Light Mode"
        aria-label="Light mode"
      >
        <Sun size={15} />
        {showLabels && <span>Light</span>}
      </button>

      <button
        type="button"
        className={`theme-btn ${theme === t.DARK ? 'active' : ''}`}
        onClick={() => setTheme(t.DARK)}
        title="Midnight Dark Mode"
        aria-label="Dark mode"
      >
        <Moon size={15} />
        {showLabels && <span>Dark</span>}
      </button>

      <button
        type="button"
        className={`theme-btn ${theme === t.IVORY ? 'active' : ''}`}
        onClick={() => setTheme(t.IVORY)}
        title="Warm Ivory Mode"
        aria-label="Warm ivory mode"
      >
        <Sparkles size={15} />
        {showLabels && <span>Ivory</span>}
      </button>
    </div>
  );
}
