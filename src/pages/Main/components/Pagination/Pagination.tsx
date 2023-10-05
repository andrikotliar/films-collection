import './pagination.css';
import { useFilmsContext } from "@/context/FilmsContext";
import { filmsSettings } from "@/constants";
import { Button } from '@/components';

const Pagination = () => {
  const {
    getCurrentPage,
    filmsCount,
    setPage
  } = useFilmsContext();

  if(filmsCount <= filmsSettings.perPage) {
    return null;
  }

  const pagesList = (filmsCount: number) => {
    const pageNumbers: number[] = [];
    const pagesCount = filmsCount / filmsSettings.perPage;

    for(let i = 0; i <= pagesCount; i++) {
      pageNumbers.push(i + 1);
    }

    return pageNumbers;
  }

  return (
    <div className="pagination">
      {pagesList(filmsCount).map((pageNumber) => (
        <Button
          isActive={pageNumber === getCurrentPage()}
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          design={pageNumber === getCurrentPage() ? 'primary' : 'ghost'}
          className="pagination__button"
        >
          {pageNumber}
        </Button>
      ))}
    </div>
  );
};

export { Pagination };