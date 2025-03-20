export const calculateDuration = (startDate: Date | undefined): string => {
  if (!startDate) return 'N/A';
  const now = new Date();
  const differenceInMilliseconds = now.getTime() - startDate.getTime();
  const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  const months =
    now.getMonth() -
    startDate.getMonth() +
    12 * (now.getFullYear() - startDate.getFullYear());
  if (months < 1) return `${days} d`;
  if (months < 12) return `${months} m`;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  return `${years} y ${remainingMonths} m`;
};
