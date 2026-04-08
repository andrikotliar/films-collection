export const getLastActivity = (isoDate: string | null) => {
  if (!isoDate) {
    return 'Unknown';
  }

  const now = new Date();
  const last = new Date(isoDate);

  const diffMs = now.getTime() - last.getTime();

  if (isNaN(diffMs) || diffMs < 0) {
    return 'Unknown';
  }

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
};
