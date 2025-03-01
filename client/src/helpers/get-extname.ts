export const getExtName = (fileName: string) => {
  const lastDotIndex = fileName.lastIndexOf('.');

  if (lastDotIndex === 0) {
    return null;
  }

  const ext = fileName.slice(lastDotIndex);

  return ext;
};
