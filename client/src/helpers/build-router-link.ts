export const buildRouterLink = (...paths: (string | number)[]) => {
  return '/' + paths.join('/');
};
