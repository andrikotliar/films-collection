const splitAt = <T = unknown>(index: number, array: T[]) => {
  const left = array.slice(0, index);
  const right = array.slice(index + 1);

  return { left, right };
};

export { splitAt };
