type Option = {
  filter: string;
  title: string;
};

const buildFilterOptions = <T extends { [key: string]: string }>(
  titles: T,
): Option[] => {
  return Object.entries(titles).map(([key, title]) => ({
    filter: key,
    title,
  }));
};

export { buildFilterOptions };
