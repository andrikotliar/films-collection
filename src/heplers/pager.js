export const pager = (films, currentPage, perPage = 24) => {
  const from = currentPage * perPage - perPage;
  const to = currentPage * perPage;
  return {
    list: films.slice(from, to),
    from,
    to
  };
};