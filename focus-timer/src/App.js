import React, { useEffect, useMemo, useState } from 'react';
import Controls from './components/Controls';
import SessionHistory from './components/SessionHistory';
import Stats from './components/Stats';
import ThemeToggle from './components/ThemeToggle';
import Timer from './components/Timer';
import { formatFocusTime } from './utils/time';

const PRESETS = [
  { id: 'pomodoro', label: 'Pomodoro', duration: 25 * 60 },
  { id: 'shortBreak', label: 'Short Break', duration: 5 * 60 },
  { id: 'longBreak', label: 'Long Break', duration: 15 * 60 },
];

const STORAGE_KEYS = {
  theme: 'focus-timer-theme',
  sessions: 'focus-timer-sessions',
};

const loadSessions = () => {
  try {
    const savedSessions = localStorage.getItem(STORAGE_KEYS.sessions);
    return savedSessions ? JSON.parse(savedSessions) : [];
  } catch {
    return [];
  }
};

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_KEYS.theme) || 'dark');
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const [duration, setDuration] = useState(PRESETS[0].duration);
  const [timeLeft, setTimeLeft] = useState(PRESETS[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(loadSessions);

  const activePreset = PRESETS.find((preset) => preset.id === presetId) ?? PRESETS[0];
  const totalFocusSeconds = useMemo(
    () => sessions.reduce((total, session) => total + session.durationSeconds, 0),
    [sessions],
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme !== 'dark');
    root.style.colorScheme = theme;
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.sessions, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setTimeLeft((currentTimeLeft) => Math.max(currentTimeLeft - 1, 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning && timeLeft === 0) {
      setIsRunning(false);
    }
  }, [isRunning, timeLeft]);

  const handlePresetSelect = (preset) => {
    setPresetId(preset.id);
    setDuration(preset.duration);
    setTimeLeft(preset.duration);
    setIsRunning(false);
  };

  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(duration);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    const now = new Date();

    setSessions((currentSessions) => [
      {
        id: `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
        durationSeconds: duration,
        timestamp: now.toISOString(),
      },
      ...currentSessions,
    ]);

    setIsRunning(false);
    setTimeLeft(duration);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  return (
    <div
      className={`min-h-screen px-4 py-6 transition-colors duration-500 sm:px-6 lg:px-8 ${
        theme === 'dark'
          ? 'bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_40%),linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(2,6,23,1))] text-slate-50'
          : 'bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_35%),linear-gradient(180deg,_#f8fbff,_#eef4fb)] text-slate-900'
      }`}
    >
      <main className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl items-center justify-center">
        <section
          className={`w-full rounded-3xl border p-5 shadow-[0_24px_80px_rgba(15,23,42,0.3)] backdrop-blur-xl transition-all duration-500 sm:p-8 lg:p-10 ${
            theme === 'dark'
              ? 'border-white/20 bg-white/75 dark:border-white/10 dark:bg-slate-950/70'
              : 'border-slate-200 bg-white/90'
          }`}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                  Focus Timer
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                  Stay productive and track your focus sessions.
                </p>
              </div>
              <ThemeToggle
                theme={theme}
                onToggle={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
              <div
                className={`rounded-3xl border p-5 shadow-inner sm:p-6 ${
                  theme === 'dark'
                    ? 'border-white/30 bg-slate-900/5 shadow-white/20 dark:border-white/10 dark:bg-white/5'
                    : 'border-slate-200 bg-slate-50/80 shadow-slate-900/5'
                }`}
              >
                <div className="flex flex-wrap gap-3">
                  {PRESETS.map((preset) => {
                    const isActive = preset.id === presetId;

                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handlePresetSelect(preset)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                          isActive
                            ? 'bg-sky-500 text-white shadow-[0_12px_30px_rgba(14,165,233,0.35)]'
                            : 'bg-white/80 text-slate-700 ring-1 ring-slate-200 hover:bg-white dark:bg-slate-900/70 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-slate-900'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-center">
                  <Timer timeLeft={timeLeft} duration={duration} label={activePreset.label} />
                </div>

                <div className="mt-8">
                  <Controls
                    isRunning={isRunning}
                    hasProgress={timeLeft < duration}
                    onStart={handleStart}
                    onPause={handlePause}
                    onStop={handleStop}
                    onReset={handleReset}
                  />
                </div>

              </div>

              <div className="grid gap-6">
                <Stats totalSessions={sessions.length} totalFocusTime={formatFocusTime(totalFocusSeconds)} />
                <SessionHistory sessions={sessions} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;