const prepareFileName = (str) => {
  const strWithoutSpecialSymbols = str.replaceAll(/[^a-zA-Z0-9\s]/g, '');
  const formattedTitle = strWithoutSpecialSymbols.replaceAll(' ', '_');

  return formattedTitle;
};

export { prepareFileName };
