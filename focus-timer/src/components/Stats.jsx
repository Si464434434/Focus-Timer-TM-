import React from 'react';

const Stats = ({ totalSessions, totalFocusTime }) => {
  return (
    <div className="rounded-3xl border border-white/30 bg-white/70 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 sm:p-6">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Statistics</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-sky-500/10 p-4 ring-1 ring-sky-500/10">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Sessions</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{totalSessions}</p>
        </div>
        <div className="rounded-2xl bg-emerald-500/10 p-4 ring-1 ring-emerald-500/10">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Focus Time</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{totalFocusTime}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;