const buildRouterLink = (...paths: (string | number)[]) => {
  return '/' + paths.join('/');
};

export { buildRouterLink };
