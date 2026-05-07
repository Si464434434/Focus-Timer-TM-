export const formatClock = (totalSeconds) => {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (safeSeconds % 60).toString().padStart(2, '0');

  return `${minutes}:${seconds}`;
};

export const formatSessionDate = (timestamp) => {
  if (!timestamp) {
    return 'Unknown date';
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(timestamp));
};

export const formatSessionTime = (timestamp) => {
  if (!timestamp) {
    return 'Unknown time';
  }

  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp));
};

export const formatFocusTime = (totalSeconds) => {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const totalMinutes = Math.floor(safeSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  return `${hours}h ${minutes}m`;
};