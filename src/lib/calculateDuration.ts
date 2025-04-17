export const calculateDuration = (startDate: string | undefined): string => {
  if (!startDate) return '';

  const start = new Date(startDate);
  const now = new Date();

  // Get the difference in milliseconds
  const differenceInMilliseconds = now.getTime() - start.getTime();

  // Calculate the difference in days
  const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  // Calculate the difference in months
  const months =
    now.getMonth() -
    start.getMonth() +
    12 * (now.getFullYear() - start.getFullYear());

  // If less than a month, return days
  if (months < 1) return `${days}d`;
  if (months < 12) return `${months}m`;

  // Otherwise, calculate years and months
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  return `${years || ''}y ${remainingMonths || ''}m`;
};
