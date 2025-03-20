export const calculateJobDuration = (
  dateOpened: string | undefined,
  dateEnd?: string | null,
  status?: string
): number => {
  if (!dateOpened) return 0;

  const startDate = new Date(dateOpened);

  // If job is closed, use dateEnd; otherwise use current date
  let endDate: Date;

  if (status === 'Closed' && dateEnd) {
    endDate = new Date(dateEnd);
  } else if (dateEnd && new Date(dateEnd) < new Date()) {
    // If end date is in the past
    endDate = new Date(dateEnd);
  } else {
    // Job is active or end date is in the future
    endDate = new Date();
  }

  // Calculate difference in milliseconds
  const differenceMs = endDate.getTime() - startDate.getTime();

  // Convert to days (rounding up)
  const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

  // Return at least 1 day if the job was opened today
  return Math.max(differenceDays, 1);
};
