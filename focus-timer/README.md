
# Focus Timer

A clean and responsive React + Tailwind CSS Focus Timer app for internship-style portfolio submission.

## Features

- Focus timer in MM:SS format
- Start, Pause, Stop, and Reset controls
- Pomodoro presets:
  - Pomodoro - 25 min
  - Short Break - 5 min
  - Long Break - 15 min
- Session history saved in localStorage
- Statistics for total sessions and total focus time
- Light and dark theme toggle with localStorage persistence
- Responsive card-based UI with soft shadows and clean typography

## Tech Stack

- React
- Tailwind CSS
- localStorage

## Run Locally

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

## Project Structure

```text
src/
├── components/
│   ├── Timer.jsx
│   ├── Controls.jsx
│   ├── SessionHistory.jsx
│   ├── ThemeToggle.jsx
│   └── Stats.jsx
```