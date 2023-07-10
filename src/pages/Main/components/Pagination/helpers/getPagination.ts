import { filmsSettings } from "@/constants";

const getPagination = (currentPage: number, filmsCount: number) => {
  const lastPage = Math.ceil(filmsCount / filmsSettings.perPage);
  const left = currentPage - 1;
  const right = currentPage + 1;
  const range = [];

  for (let i = 1; i <= lastPage; i++) {
    if (i == 1 || i == lastPage || i >= left && i <= right) {
      range.push(i);
    }
  }

  return range;
}

export { getPagination };