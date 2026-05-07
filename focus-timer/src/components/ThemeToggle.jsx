import React from 'react';

const ThemeToggle = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100"
    >
      <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
};

export default ThemeToggle;