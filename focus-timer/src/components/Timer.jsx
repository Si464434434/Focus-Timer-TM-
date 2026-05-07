import React from 'react';
import { formatClock } from '../utils/time';

const Timer = ({ timeLeft, duration }) => {
  const progress = duration > 0 ? (duration - timeLeft) / duration : 0;
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - progress * circumference;

  return (
    <div className="flex w-full max-w-sm flex-col items-center text-center">
      <div className="relative w-full">
        <div className="absolute inset-0 rounded-full bg-sky-500/10 blur-3xl" />
        <svg viewBox="0 0 220 220" className="relative mx-auto block h-auto w-full drop-shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
          <circle
            cx="110"
            cy="110"
            r={radius}
            className="stroke-slate-200/90 dark:stroke-slate-700/80"
            strokeWidth="14"
            fill="none"
          />
          <circle
            cx="110"
            cy="110"
            r={radius}
            className="stroke-sky-500 transition-[stroke-dashoffset] duration-500 ease-out dark:stroke-cyan-300"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 110 110)"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <span className="text-5xl font-semibold tracking-tight text-slate-900 transition-all duration-300 dark:text-white sm:text-6xl">
            {formatClock(timeLeft)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Timer;