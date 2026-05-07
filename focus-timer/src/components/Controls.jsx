import React from 'react';

const baseButtonClass =
  'inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50 sm:px-5';

const Controls = ({ isRunning, hasProgress, onStart, onPause, onStop, onReset }) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <button
        type="button"
        onClick={onStart}
        className={`${baseButtonClass} bg-sky-500 text-white shadow-[0_12px_28px_rgba(14,165,233,0.28)] hover:-translate-y-0.5 hover:bg-sky-400`}
      >
        {isRunning ? 'Resume' : 'Start'}
      </button>
      <button
        type="button"
        onClick={onPause}
        disabled={!isRunning}
        className={`${baseButtonClass} bg-amber-100 text-amber-800 ring-1 ring-amber-200 hover:-translate-y-0.5 hover:bg-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-400/20`}
      >
        Pause
      </button>
      <button
        type="button"
        onClick={onStop}
        disabled={!isRunning && !hasProgress}
        className={`${baseButtonClass} bg-rose-500 text-white shadow-[0_12px_28px_rgba(244,63,94,0.25)] hover:-translate-y-0.5 hover:bg-rose-400`}
      >
        Stop
      </button>
      <button
        type="button"
        onClick={onReset}
        className={`${baseButtonClass} bg-white text-slate-700 ring-1 ring-slate-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:bg-slate-900/80 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-slate-900`}
      >
        Reset
      </button>
    </div>
  );
};

export default Controls;