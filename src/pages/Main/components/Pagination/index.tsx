import './styles.css';
import { useFilmsContext } from "@/context/FilmsContext";
import classNames from "classnames";
import { filmsSettings } from "@/constants";

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
        <button
          className={classNames(
            'page-button',
            {
              'page-button--active': pageNumber === getCurrentPage()
            }
          )}
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;