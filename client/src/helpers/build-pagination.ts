export const buildPagination = (
  currentPage: number,
  total: number,
  perPage: number,
) => {
  const pages = [0];
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 10) {
    for (let i = 1; i < totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  const lastPage = totalPages - 1;

  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 0 && i < lastPage) {
      pages.push(i);
    }
  }

  pages.push(lastPage);

  const result: (string | number)[] = [];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    result.push(page);

    const next = pages[i + 1];

    if (next !== undefined && next - page > 1) {
      result.push('...');
    }
  }

  return result;
};
