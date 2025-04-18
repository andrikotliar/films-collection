export const replaceUrlId = (url: string, id: string | number) => {
  return url.replace('$id', id.toString());
};
