const getFormattedDate = (value: Date) => {
  const formattedDate = value.toLocaleString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });

  return formattedDate;
};

export { getFormattedDate };
