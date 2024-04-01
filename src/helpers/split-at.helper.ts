const splitAt = <T = unknown>(index: number, array: T[]) => {
  if (index < 0) {
    return null;
  }

  const left = array.slice(0, index);
  const right = array.slice(index + 1);

  return { left, right };
};

export { splitAt };
