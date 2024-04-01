const splitAt = (index: number, array: any[]) => {
  const left = array.slice(0, index);
  const right = array.slice(index);
  return [left, right];
};

export { splitAt };
