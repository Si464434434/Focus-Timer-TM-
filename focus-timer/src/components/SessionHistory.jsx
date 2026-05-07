import React from 'react';
import { formatClock, formatSessionDate, formatSessionTime } from '../utils/time';

const SessionHistory = ({ sessions }) => {
  return (
    <div className="rounded-3xl border border-white/30 bg-white/70 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 sm:p-6">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Session History</h2>

      <div className="mt-5">
        {sessions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 px-4 py-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
            No sessions yet
          </div>
        ) : (
          <ul className="space-y-3">
            {sessions.map((session, index) => (
              <li
                key={session.id || index}
                className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-slate-900/70"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {formatClock(session.durationSeconds)}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {formatSessionDate(session.timestamp)} • {formatSessionTime(session.timestamp)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SessionHistory;