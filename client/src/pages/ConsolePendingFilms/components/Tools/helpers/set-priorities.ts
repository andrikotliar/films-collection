export const setPriorities = (value: number, prevPriorities: number[] = []) => {
  if (!prevPriorities.length) {
    return [value];
  }

  if (prevPriorities.includes(value)) {
    return prevPriorities.filter((priority) => priority !== value);
  }

  return [...prevPriorities, value];
};
