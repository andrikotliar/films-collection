export const buildPagination = (currentPage: number, pagesCount: number, distance: number = 4) => {
  const pages: (string | number)[] = [];

  if (!pagesCount || !currentPage || !distance) {
    return pages;
  }

  if (pagesCount < distance * 2) {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return pages;
  }

  if (currentPage - distance < 1) {
    for (let i = 1; i <= distance + 1; i++) {
      pages.push(i);
    }

    pages.push('...', pagesCount);

    return pages;
  }

  if (currentPage + distance - 1 >= pagesCount) {
    pages.push(1, '...');

    for (let i = pagesCount - distance; i <= pagesCount; i++) {
      pages.push(i);
    }

    return pages;
  }

  const before = currentPage - 1;
  const after = currentPage + 1;

  pages.push(1);

  if (before > 2) {
    pages.push('...');
  }

  pages.push(before, currentPage, after);

  if (after < pagesCount - 1) {
    pages.push('...');
  }

  pages.push(pagesCount);

  return pages;
};
